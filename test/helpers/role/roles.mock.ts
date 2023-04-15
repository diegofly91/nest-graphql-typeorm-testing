import { IRole } from '@/modules/role/interfaces';
import { RoleType } from '@/modules/role/enums';

export const rolesMock: IRole[] = [
    {
        id: 1,
        name: RoleType.SUPERUSER,
        description: 'Este Rol puede operar toda la aplicacion con total libertad.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        name: RoleType.ADMIN,
        description: 'Este Rol puede ejecutar todas las funciones que corresponden a un administrador.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 3,
        name: RoleType.ADVISER,
        description: 'puede ejecutar todas las funciones que corresponden a un Negocio/Compañia.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 4,
        name: RoleType.CUSTOMER,
        description:
            'puede ejecutar todas las funciones que corresponden a un usuario que consume los servicios de un negocio.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
