import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { UserInterfaceRepository } from '../interfaces';
import { Status } from '@/modules/shared/enums';

@Injectable()
export class UserRepository<User> implements UserInterfaceRepository<User> {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async getUserById(id: number): Promise<User> {
        return await this.usersRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
    }

    async getPasswordByEmail(email: string): Promise<User> {
        return await this.usersRepository
            .createQueryBuilder('user')
            .select()
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();
    }

    /*
    async getUserByCompanyId(companyId: number): Promise<User> {
        return await this.usersRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('companies', 'companies', 'companies.user_id = user.id AND companies.id = :companyId', {
                companyId,
            })
            .getOne();
    }*/
    async getUserByEmail(email: string): Promise<User> {
        return await this.usersRepository.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
    }

    async updateUserPassword(email: string, password: string): Promise<boolean> {
        const user = await this.getUserByEmail(email);
        const updatePassword = new User();
        updatePassword.password = password;
        const updateUser = Object.assign(user, { password: updatePassword.password });
        const saved = await this.usersRepository.save(updateUser);
        return !!saved;
    }

    async createUser({ email, roleId, status, password }: CreateUserDto): Promise<User> {
        const user = new User();
        user.password = password;
        user.roleId = roleId;
        user.status = status;
        user.email = email;
        const { raw } = await this.usersRepository.createQueryBuilder().insert().into(User).values(user).execute();
        return raw[0];
    }

    async deleteUser(userId: number): Promise<User> {
        const user: User = await this.getUserById(userId);
        const userUpdate = Object.assign(user, { status: Status.DELETED });
        const userDeleted = await this.usersRepository.save(userUpdate);
        return userDeleted;
    }
}
