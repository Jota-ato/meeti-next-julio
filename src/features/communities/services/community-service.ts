import { User } from "@/features/auth/types/auth.types";
import { CommunityType } from "../schemas/comunity-schema";
import { communityRepository, ICommunityRepository } from "./community-repository";
import { CommunityPolicy } from "../policies/community-policy";
import { MembershipPolicy } from "../policies/membership-policy";
import { SelectCommunity } from "../types/community.types";
import { notFound } from "next/navigation";
import { checkPassword } from "@/shared/utils/auth";
import { deleteUTFiles } from "@/lib/uploadthing-server";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ) { }

    async createCommunity(data: CommunityType, userId: string) {
        await this.communityRepository.createCommunity({
            ...data,
            createdBy: userId
        })
    }

    async editCommunity(data: CommunityType, user: User, communityId: SelectCommunity['id']) {
        const community = await this.getCommunity(communityId)
        if (!CommunityPolicy.canEdit(user, community)) {
            throw new Error('No tienes permisos para actualizar esta communidad')
        }

        await this.communityRepository.update(data, community.id)
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id)

        const enriched = await Promise.all(communities.map(async (community) => {
            const isMember = true
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

    async getCommunity(communityId: SelectCommunity['id']) {
        const community = await this.communityRepository.findById(communityId)
        if (!community) notFound()
        return community
    }

    async getCommunityDetails(communityId: SelectCommunity['id'], user: User) {

        const community = await this.getCommunity(communityId)
        const isMember = false

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
        await deleteUTFiles(community.image)
        return {
            success: true,
            message: 'Communidad eliminada correctamente'
        }
    }
}

export const communityService = new CommunityService(communityRepository)