import { Injectable } from '@nestjs/common';
import { InputProfileUserDto } from '../dtos';
import { UserProfile } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileInterfaceRepository } from '../interfaces';

@Injectable()
export class ProfileRepository<UserProfile> implements ProfileInterfaceRepository<UserProfile> {
    constructor(
        @InjectRepository(UserProfile)
        private readonly profileRepository: Repository<UserProfile>,
    ) {}

    async getProfileUserById(userId: number): Promise<UserProfile> {
        return await this.profileRepository
            .createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
    }

    async createProfileUser(userId: number, input: InputProfileUserDto): Promise<UserProfile> {
        const newProfile = new UserProfile();
        newProfile.address = input.address;
        newProfile.firstname = input.firstname;
        newProfile.lastname = input.lastname;
        newProfile.phone = input.phone;
        newProfile.userId = userId;
        const { raw } = await this.profileRepository
            .createQueryBuilder()
            .insert()
            .into(UserProfile)
            .values(newProfile)
            .execute();
        return raw;
    }

    async updateProfileUser(userId: number, input: InputProfileUserDto): Promise<UserProfile> {
        const profile = await this.getProfileUserById(userId);
        const profileToUpdate = Object.assign(profile, input);
        return await this.profileRepository.save(profileToUpdate);
    }
}
