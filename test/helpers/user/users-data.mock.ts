import { User, Status } from '../../gql/queries';

export const usersMock: User[] = [
    {
        id: 1,
        status: Status.Active,
        roleId: 1,
        email: 'diego@gmail.com',
        password: '12345678d',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        status: Status.Active,
        roleId: 2,
        email: 'andres@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 3,
        status: Status.Preactive,
        roleId: 3,
        email: 'andres2@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 4,
        status: Status.Active,
        roleId: 4,
        email: 'andres3@gmail.com',
        password: '123456786',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
