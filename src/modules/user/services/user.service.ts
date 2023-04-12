import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dtos';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly userRepository: UserRepository<User>,
    ) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.getUsers();
    }

    async getUserById(userId: number): Promise<User> {
        return await this.userRepository.getUserById(userId);
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.getUserByEmail(email);
    }

    async getPasswordByEmail(email: string): Promise<User> {
        return await this.userRepository.getPasswordByEmail(email);
    }

    /*  async getUserByCompanyId(companyId: string): Promise<User> {
        return await this.userRepository.getUserByCompanyId(companyId);
    } */

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.userRepository.createUser(dto);
    }

    async deleteUser(userId: number): Promise<User> {
        return await this.userRepository.deleteUser(userId);
    }
}
