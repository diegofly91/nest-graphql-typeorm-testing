import { User } from '../entities';
import { CreateUserDto } from '../dtos';

export interface UserInterfaceRepository<User> {
    getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getPasswordByEmail(email: string): Promise<User>;
    //getUserByCompanyId(companyId: number): Promise<User>;
    createUser(dto: CreateUserDto): Promise<User>;
    deleteUser(userId: number): Promise<User>;
    //newPasswordRequest(): Promise<string>;
}
