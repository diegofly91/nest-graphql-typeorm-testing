import { CreateUserDto } from '../dtos';

export interface IUserRepository<IUser> {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser>;
    getPasswordByEmail(email: string): Promise<IUser>;
    //getUserByCompanyId(companyId: number): Promise<User>;
    createUser(dto: CreateUserDto): Promise<IUser>;
    deleteUser(id: number): Promise<IUser>;
    updateUserPassword(email: string, password: string): Promise<boolean>;
    //newPasswordRequest(): Promise<string>;
}
