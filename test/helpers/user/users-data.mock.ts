import { IUser } from '@/modules/user/interfaces';
import { Status } from '@/modules/shared/enums';
export const usersMock: IUser[] = [
    {
        id: 1,
        status: Status.ACTIVE,
        roleId: 1,
        email: 'diego@gmail.com',
        password: '123456',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        status: Status.ACTIVE,
        roleId: 1,
        email: 'andres@gmail.com',
        password: '123456',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
