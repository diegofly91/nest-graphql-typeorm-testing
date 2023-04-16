import { CreateUserDto } from '../dtos';
import { IUser } from './user.interface';

export interface UserInterfaceRepository<IUser> {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser>;
    getPasswordByEmail(email: string): Promise<IUser>;
    //getUserByCompanyId(companyId: number): Promise<User>;
    createUser(dto: CreateUserDto): Promise<IUser>;
    deleteUser(userId: number): Promise<IUser>;
    //newPasswordRequest(): Promise<string>;
}
