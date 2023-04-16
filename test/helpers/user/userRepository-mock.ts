import { usersMock } from './users-data.mock';
import { IUser } from '@/modules/user/interfaces';
import { Status } from '@/modules/shared/enums';

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

    async createUser(user: IUser): Promise<IUser> {
        return Promise.resolve({ ...user, id: usersMock.length + 1 });
    }

    deleteUser(userId: number): Promise<IUser> {
        const user = usersMock.find((user) => user.id === userId);
        const userUpdate = Object.assign(user, { status: Status.DELETED });
        return Promise.resolve(userUpdate);
    }
}
