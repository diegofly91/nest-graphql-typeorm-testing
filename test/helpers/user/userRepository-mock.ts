import { IUserRepository } from '@/modules/user/interfaces';
import { usersMock } from './users-data.mock';
import { User, Status, CreateUserDto } from '../../gql/queries';

export class UserRepositoryMock implements IUserRepository<User> {
    getUsers(): Promise<User[]> {
        return Promise.resolve([...usersMock]);
    }

    getUserById(id: number): Promise<User> {
        return Promise.resolve(usersMock.find((user) => user.id === id));
    }

    getUserByEmail(email: string): Promise<User> {
        const user = usersMock.find((user) => user.email === email);
        return Promise.resolve(user);
    }

    getPasswordByEmail(email: string): Promise<User> {
        return Promise.resolve(usersMock.find((user) => user.email === email));
    }

    createUser(dto: CreateUserDto): Promise<User> {
        const newUser = {
            ...dto,
            id: usersMock.length + 1,
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
        };
        usersMock.push({ ...newUser });
        return Promise.resolve(newUser);
    }

    updateUserPassword(email: string, password: string): Promise<boolean> {
        const user = usersMock.find((user) => user.email === email);
        const userUpdate = Object.assign(user, { password });
        return Promise.resolve(!!userUpdate);
    }

    deleteUser(userId: number): Promise<User> {
        const user = usersMock.find((user) => user.id === userId);
        const userUpdate = Object.assign(user, { status: Status.Deleted });
        return Promise.resolve(userUpdate);
    }
}
