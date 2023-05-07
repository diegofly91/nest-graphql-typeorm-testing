import { DocumentType } from '../../gql/queries';

export const docTypeMock: DocumentType[] = [
    {
        id: 1,
        name: 'Cedula de Ciudadania',
        description: 'Cedula de Ciudadania',
        abbreviation: 'CC',
        isActive: true,
        required: true,
        deleted: false,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
    {
        id: 2,
        name: 'Cedula de Extranjeria',
        description: 'Cedula de Extranjeria',
        abbreviation: 'CE',
        isActive: true,
        required: true,
        deleted: false,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
    {
        id: 3,
        name: 'Pasaporte',
        description: 'Pasaporte',
        abbreviation: 'PAS',
        isActive: true,
        required: true,
        deleted: false,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
    },
];
