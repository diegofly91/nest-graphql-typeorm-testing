import { IUserProfile, ProfileInterfaceRepository } from '@/modules/user/interfaces';
import { userProfilesMock } from './userProfile.mock';

export class UserProfileRepositoryMock implements ProfileInterfaceRepository<IUserProfile> {
    async getProfileUserById(userId: number): Promise<IUserProfile> {
        return Promise.resolve(userProfilesMock.find((profile) => profile.userId === userId));
    }

    async createProfileUser(userId: number, dto: any): Promise<IUserProfile> {
        return Promise.resolve({ ...dto, userId, id: userProfilesMock.length + 1 });
    }

    async updateProfileUser(userId: number, dto: any): Promise<IUserProfile> {
        const profile = userProfilesMock.find((profile) => profile.userId === userId);
        return Promise.resolve({ ...profile, ...dto });
    }
}