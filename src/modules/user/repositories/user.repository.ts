import { /*BadRequestException, NotFoundException,*/ Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos';
import { User } from '../entities';
import { UserInterfaceRepository } from '../interfaces';

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

    async createUser(dto: CreateUserDto): Promise<User> {
        const exitsUsername = await this.getUserByEmail(dto.email);
        if (exitsUsername) {
            throw new HttpException('The Exits EMAIL', HttpStatus.PRECONDITION_FAILED);
        }
        const user = new User();
        user.password = dto.password;
        user.roleId = dto.roleId;
        user.status = dto.status;
        user.email = dto.email;

        const { raw } = await this.usersRepository.createQueryBuilder().insert().into(User).values(user).execute();
        return raw[0];
    }

    async deleteUser(userId: number): Promise<User> {
        const user: User = await this.getUserById(userId);
        const userDeleted = await this.usersRepository.save(user);
        return userDeleted;
    }
}
