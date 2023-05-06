import { Category, Status } from '../../gql/queries';

const categoriesMock: Category[] = [
    {
        id: 1,
        name: 'Category 1',
        description: 'Description 1',
        picture: 'Picture 1',
        status: Status.Active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: 'Category 2',
        description: 'Description 2',
        picture: 'Picture 2',
        status: Status.Active,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export { categoriesMock };
