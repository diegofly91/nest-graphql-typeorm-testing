//import { UserProfile } from '../entities';
import { InputProfileUserDto } from '../dtos';
import { IUserProfile } from './user-profile.interface';

export interface ProfileInterfaceRepository<IUserProfile> {
    getProfileUserById(userId: number): Promise<IUserProfile>;
    createProfileUser(userId: number, dto: InputProfileUserDto): Promise<IUserProfile>;
    updateProfileUser(userId: number, dto: InputProfileUserDto): Promise<IUserProfile>;
}
