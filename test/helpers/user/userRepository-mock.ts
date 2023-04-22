import { usersMock } from './users-data.mock';
import { IUser, IUserRepository } from '@/modules/user/interfaces';
import { Status } from '@/modules/shared/enums';
import { CreateUserDto } from '@/modules/user/dtos';

export class UserRepositoryMock implements IUserRepository<IUser> {
    getUsers(): Promise<IUser[]> {
        return Promise.resolve([...usersMock]);
    }

    getUserById(id: number): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.id === id));
    }

    getUserByEmail(email: string): Promise<IUser> {
        const user = usersMock.find((user) => user.email === email);
        return Promise.resolve(user);
    }

    getPasswordByEmail(email: string): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.email === email));
    }

    createUser(dto: CreateUserDto): Promise<IUser> {
        return Promise.resolve({
            ...dto,
            id: usersMock.length + 1,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        });
    }

    updateUserPassword(email: string, password: string): Promise<boolean> {
        const user = usersMock.find((user) => user.email === email);
        const userUpdate = Object.assign(user, { password });
        return Promise.resolve(!!userUpdate);
    }

    deleteUser(userId: number): Promise<IUser> {
        const user = usersMock.find((user) => user.id === userId);
        const userUpdate = Object.assign(user, { status: Status.DELETED });
        return Promise.resolve(userUpdate);
    }
}
