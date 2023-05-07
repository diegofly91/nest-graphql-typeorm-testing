import { Injectable } from '@nestjs/common';
import { InputProfileUserDto } from '../dtos';
import { Profile } from '../entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IProfile, IProfileRepository } from '../interfaces';

@Injectable()
export class ProfileRepository extends Repository<Profile> implements IProfileRepository<IProfile> {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>,
    ) {
        super(profileRepository.target, profileRepository.manager, profileRepository.queryRunner);
    }

    async getProfileUserById(userId: number): Promise<Profile> {
        return await this.profileRepository
            .createQueryBuilder('profiles')
            .select()
            .where('profiles.userId = :userId', { userId })
            .getOne();
    }

    async createProfileUser(userId: number, input: InputProfileUserDto): Promise<Profile> {
        const newProfile = new Profile();
        newProfile.address = input.address;
        newProfile.firstname = input.firstname;
        newProfile.lastname = input.lastname;
        newProfile.phone = input.phone;
        newProfile.userId = userId;
        const { raw } = await this.profileRepository
            .createQueryBuilder()
            .insert()
            .into(Profile)
            .values(newProfile)
            .execute();
        return raw;
    }

    async updateProfileUser(userId: number, input: InputProfileUserDto): Promise<Profile> {
        const profile = await this.getProfileUserById(userId);
        const profileToUpdate = Object.assign(profile, input);
        return await this.profileRepository.save(profileToUpdate);
    }
}
