import { usersMock } from './user.mock';
import { IUser, UserInterfaceRepository } from '@/modules/user/interfaces';

export class UserRepositoryMock {
    getUsers(): Promise<IUser[]> {
        return Promise.resolve([...usersMock]);
    }

    getUserById(id: number): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.id === id));
    }

    getUserByEmail(email: string): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.email === email));
    }

    getPasswordByEmail(email: string): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.email === email));
    }

    createUser(user: IUser): Promise<IUser> {
        return Promise.resolve({ ...user, id: usersMock.length + 1 });
    }

    deleteUser(userId: number): Promise<IUser> {
        return Promise.resolve(usersMock.find((user) => user.id === userId));
    }
}
