import { IUserProfile } from '@/modules/user/interfaces';

export const userProfilesMock: IUserProfile[] = [
    {
        id: 1,
        userId: 1,
        firstname: 'Diego',
        lastname: 'Garcia',
        phone: '123456789',
        address: 'Calle 123',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
    },
    {
        id: 2,
        userId: 2,
        firstname: 'Andres',
        lastname: 'Garcia',
        phone: '123456789',
        address: 'Calle 123',
        createdAt: '2021-01-01',
        updatedAt: '2021-01-01',
    },
];
