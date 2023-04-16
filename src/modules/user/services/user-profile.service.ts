import { Injectable, Inject } from '@nestjs/common';
import { InputProfileUserDto } from '../dtos';
import { UserProfile } from '../entities';
import { ProfileRepository } from '../repositories';

@Injectable()
export class ProfileService {
    constructor(
        @Inject('ProfileRepositoryInterface')
        private readonly profileUserRepository: ProfileRepository<UserProfile>,
    ) {}

    async getProfileUserById(userId: number): Promise<UserProfile> {
        return await this.profileUserRepository.getProfileUserById(userId);
    }

    async createProfileUser(userId: number, input: InputProfileUserDto): Promise<UserProfile> {
        return this.profileUserRepository.createProfileUser(userId, input);
    }

    async updateProfileUser(id: number, input: InputProfileUserDto): Promise<UserProfile> {
        return await this.profileUserRepository.updateProfileUser(id, input);
    }
}