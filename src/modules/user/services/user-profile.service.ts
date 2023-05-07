import { Injectable } from '@nestjs/common';
import { InputProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { ProfileRepository } from '../repositories';

@Injectable()
export class ProfileService {
    constructor(private readonly profileUserRepository: ProfileRepository) {}

    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.profileUserRepository.getProfileUserById(userId);
    }

    async createProfileUser(userId: number, input: InputProfileUserDto): Promise<Profile> {
        return this.profileUserRepository.createProfileUser(userId, input);
    }

    async updateProfileUser(id: number, input: InputProfileUserDto): Promise<Profile> {
        return await this.profileUserRepository.updateProfileUser(id, input);
    }
}
