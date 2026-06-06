import { User } from "@/features/auth/types/auth.types";
import { CommunityType } from "../schemas/comunity-schema";
import { communityRepository, ICommunityRepository } from "./community-repository";
import { CommunityPolicy } from "../policies/community-policy";
import { MembershipPolicy } from "../policies/membership-policy";
import { SelectCommunity } from "../types/community.types";
import { notFound } from "next/navigation";
import { checkPassword } from "@/shared/utils/auth";
import { deleteUTFiles } from "@/lib/uploadthing-server";
import { IMembershipRepository, membershipRepository } from "./membership-repository";

/**
 * Service layer responsible for executing Community business logic.
 * Orchestrates repositories, enforces policies, and interacts with external utilities.
 */
class CommunityService {
    /**
     * Injects necessary repositories to decouple business logic from data access.
     * * @param {ICommunityRepository} communityRepository - Repository for community entities.
     * @param {IMembershipRepository} membershipRepository - Repository for membership relations.
     */
    constructor(
        private communityRepository: ICommunityRepository,
        private membershipRepository: IMembershipRepository
    ) { }

    /**
     * Creates a new community and associates the user as its creator.
     * * @param {CommunityType} data - The validated community payload.
     * @param {string} userId - The ID of the user requesting the creation.
     * @returns {Promise<void>}
     */
    async createCommunity(data: CommunityType, userId: string): Promise<void> {
        await this.communityRepository.createCommunity({
            ...data,
            createdBy: userId
        })
    }

    /**
     * Validates permissions and updates a community's details.
     * * @param {CommunityType} data - The data payload for the update.
     * @param {User} user - The user attempting to perform the edit.
     * @param {SelectCommunity['id']} communityId - The target community's ID.
     * @throws {Error} If the user lacks the required editing policies.
     * @returns {Promise<void>}
     */
    async editCommunity(data: CommunityType, user: User, communityId: SelectCommunity['id']): Promise<void> {
        const community = await this.getCommunity(communityId)
        if (!CommunityPolicy.canEdit(user, community)) {
            throw new Error('No tienes permisos para actualizar esta communidad')
        }

        await this.communityRepository.update(data, community.id)
    }

    /**
     * Retrieves all communities created by a specific user, enriched with contextual permissions.
     * * @param {User} user - The user whose communities are being queried.
     * @returns {Promise<Array<{data: SelectCommunity, context: any, permissions: any}>>} Enriched community objects.
     */
    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id)

        const enriched = await Promise.all(communities.map(async (community) => {
            // to accurately reflect if the user is a member, not just the creator.
            const isMember = await this.membershipRepository.isMember(community.id, user.id)
            return {
                data: community,
                context: {
                    isMember,
                    isAdmin: CommunityPolicy.isAdmin(user, community)
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }
        }))
        return enriched
    }

    /**
     * Fetches a raw community by its ID.
     * * @todo Refactor to avoid tight coupling with Next.js router (`notFound()`).
     * Consider throwing a specific `NotFoundError` to be caught by the Server Action instead.
     * * @param {SelectCommunity['id']} communityId - The community identifier.
     * @throws {Error} Triggers Next.js `notFound()` boundary if the community doesn't exist.
     * @returns {Promise<SelectCommunity>} The retrieved community.
     */
    async getCommunity(communityId: SelectCommunity['id']): Promise<SelectCommunity> {
        const community = await this.communityRepository.findById(communityId)
        if (!community) notFound()
        return community
    }

    /**
     * Retrieves detailed information of a community, optionally enriched with user-specific permissions.
     * * @param {SelectCommunity['id']} communityId - The community identifier.
     * @param {User} [user] - Optional user to calculate dynamic access policies.
     * @returns {Promise<Object>} The community payload containing data, membership context, and permission flags.
     */
    async getCommunityDetails(communityId: SelectCommunity['id'], user?: User) {
        const community = await this.getCommunity(communityId)

        if (!user) {
            return {
                data: community,
                context: null,
                permissions: null
            }
        }

        const isMember = await this.membershipRepository.isMember(communityId, user.id)

        return {
            data: community,
            context: {
                isMember,
                isAdmin: CommunityPolicy.isAdmin(user, community)
            },
            permissions: {
                canEdit: CommunityPolicy.canEdit(user, community),
                canDelete: CommunityPolicy.canDelete(user, community),
                canJoin: MembershipPolicy.canJoin(user, community, isMember),
                canLeave: MembershipPolicy.canLeave(user, community, isMember),
                canViewMembers: CommunityPolicy.canViewMembers(user, community)
            }
        }
    }

    /**
     * Executes the deletion flow for a community, including permission validation, 
     * password verification, DB removal, and associated asset cleanup via UploadThing.
     * * @param {SelectCommunity['id']} communityId - The ID of the community to delete.
     * @param {string} password - The user's password for security verification.
     * @param {User} user - The user attempting the deletion.
     * @throws {Error} If the user lacks deletion privileges based on CommunityPolicy.
     * @returns {Promise<{success: boolean, message: string}>} Result object detailing the operation's outcome.
     */
    async deleteCommunity(communityId: SelectCommunity['id'], password: string, user: User) {
        const community = await this.getCommunity(communityId)

        if (!CommunityPolicy.canDelete(user, community)) {
            throw new Error('No tienes permisos para eliminar esta communidad')
        }

        const isValidPassword = await checkPassword(password)

        if (!isValidPassword) {
            return {
                success: false,
                message: 'La contraseña es incorrecta'
            }
        }

        await this.communityRepository.delete(communityId)
        await deleteUTFiles(community.image) // Clean up assets

        return {
            success: true,
            message: 'Communidad eliminada correctamente'
        }
    }
}

export const communityService = new CommunityService(communityRepository, membershipRepository)