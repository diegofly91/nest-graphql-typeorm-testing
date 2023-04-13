import { UserProfile } from '../entities';
import { InputProfileUserDto } from '../dtos';

export interface ProfileInterfaceRepository<UserProfile> {
    getProfileUserById(userId: number): Promise<UserProfile>;
    createProfileUser(userId: number, dto: InputProfileUserDto): Promise<UserProfile>;
    updateProfileUser(userId: number, dto: InputProfileUserDto): Promise<UserProfile>;
}
