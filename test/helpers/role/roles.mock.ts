import { RoleType, Role } from '../../gql/queries';
export const rolesMock: Role[] = [
    {
        id: 1,
        name: RoleType.Superuser,
        description: 'Este Rol puede operar toda la aplicacion con total libertad.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: RoleType.Admin,
        description: 'Este Rol puede ejecutar todas las funciones que corresponden a un administrador.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 3,
        name: RoleType.Adviser,
        description: 'puede ejecutar todas las funciones que corresponden a un Negocio/Compañia.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 4,
        name: RoleType.Customer,
        description:
            'puede ejecutar todas las funciones que corresponden a un usuario que consume los servicios de un negocio.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
