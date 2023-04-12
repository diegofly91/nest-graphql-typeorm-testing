import { RoleType } from '@/modules/role/enums';
import { CreateRoleDto } from '@/modules/role/dtos';

export const rolesSeed: CreateRoleDto[] = [
  {
    name: RoleType.SUPERUSER,
    description: 'Este Rol puede operar toda la aplicacion con total libertad.',
  },
  {
    name: RoleType.ADMIN,
    description:
      'Este Rol puede ejecutar todas las funciones que corresponden a un administrador.',
  },
  {
    name: RoleType.ADVISER,
    description:
      'puede ejecutar todas las funciones que corresponden a un Negocio/Compañia.',
  },
  {
    name: RoleType.CUSTOMER,
    description:
      'puede ejecutar todas las funciones que corresponden a un usuario que consume los servicios de un negocio.',
  },
];
