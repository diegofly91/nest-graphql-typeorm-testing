import { InputProfileUserDto } from '../dtos';

export interface IProfileRepository<IUserProfile> {
    getProfileUserById(userId: number): Promise<IUserProfile>;
    createProfileUser(userId: number, dto: InputProfileUserDto): Promise<IUserProfile>;
    updateProfileUser(userId: number, dto: InputProfileUserDto): Promise<IUserProfile>;
}
