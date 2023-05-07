import { InputProfileUserDto } from '../dtos';

export interface IProfileRepository<IProfile> {
    getProfileUserById(userId: number): Promise<IProfile>;
    createProfileUser(userId: number, dto: InputProfileUserDto): Promise<IProfile>;
    updateProfileUser(userId: number, dto: InputProfileUserDto): Promise<IProfile>;
}
