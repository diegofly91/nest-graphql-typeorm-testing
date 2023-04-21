import { Injectable, Inject } from '@nestjs/common';
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

    async updateUserPassword(email: string, password: string): Promise<boolean> {
        return await this.userRepository.updateUserPassword(email, password);
    }

    /*  async getUserByCompanyId(companyId: string): Promise<User> {
        return await this.userRepository.getUserByCompanyId(companyId);
    } */

    async createUser(input: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(input);
    }

    async deleteUser(userId: number): Promise<User> {
        return await this.userRepository.deleteUser(userId);
    }
}
