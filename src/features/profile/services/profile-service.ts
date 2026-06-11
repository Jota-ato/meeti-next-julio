import { auth } from "@/lib/auth";
import { ProfileType } from "../schemas/profile-schema";
import { IProfileRepository, profileRepository } from "./profile-repository";
import { headers } from "next/headers";

class ProfileService { 
    constructor(
        private profileRepository: IProfileRepository
    ) { }

    async updateProfile(data: ProfileType) { 
        await auth.api.updateUser({
            body: {
                ...data
            },
            headers: await headers()
        })
    }

    async getProfileDetails(profileId: string) { 
        return await this.profileRepository.findFullProfileById(profileId)
    }
}

export const profileService = new ProfileService(
    profileRepository
)