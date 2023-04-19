import { IUser } from '@/modules/user/interfaces';
import { Status } from '@/modules/shared/enums';
export const usersMock: IUser[] = [
    {
        id: 1,
        status: Status.ACTIVE,
        roleId: 1,
        email: 'diego@gmail.com',
        password: '12345678d',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        status: Status.ACTIVE,
        roleId: 2,
        email: 'andres@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 3,
        status: Status.PREACTIVE,
        roleId: 3,
        email: 'andres2@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 4,
        status: Status.ACTIVE,
        roleId: 4,
        email: 'andres3@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
