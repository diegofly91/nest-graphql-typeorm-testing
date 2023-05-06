import { IProfileRepository } from '@/modules/user/interfaces';
import { userProfilesMock } from './userProfile.mock';
import { Profile, InputProfileUserDto } from '../../gql/queries';

export class UserProfileRepositoryMock implements IProfileRepository<Profile> {
    async getProfileUserById(userId: number): Promise<Profile> {
        return Promise.resolve(userProfilesMock.find((profile) => profile.userId === userId));
    }

    async createProfileUser(userId: number, dto: InputProfileUserDto): Promise<Profile> {
        userProfilesMock.push({ ...dto, userId, id: userProfilesMock.length + 1 });
        return Promise.resolve(userProfilesMock[userProfilesMock.length]);
    }

    async updateProfileUser(userId: number, dto: InputProfileUserDto): Promise<Profile> {
        const profile = userProfilesMock.find((profile) => profile.userId === userId);
        return Promise.resolve({ ...profile, ...dto });
    }
}
