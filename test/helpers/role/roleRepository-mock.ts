import { rolesMock } from './roles.mock';
import { IRoleRepository } from '@/modules/role/interfaces';
import { Role } from '../../gql/queries';

export class RoleRepositoryMock implements IRoleRepository<Role> {
    getRoles(): Promise<Role[]> {
        return Promise.resolve(rolesMock);
    }

    getRoleById(id: number): Promise<Role> {
        return Promise.resolve(rolesMock.find((role) => role.id === id));
    }

    getRoleByName(name: string): Promise<Role> {
        return Promise.resolve(rolesMock.find((role) => role.name === name));
    }

    createRole(dto: any): Promise<Role> {
        return Promise.resolve({ ...dto, id: rolesMock.length + 1 });
    }

    createRoles(dto: any[]): Promise<Role[]> {
        return Promise.resolve(
            dto.map((role) => {
                return { ...role, id: rolesMock.length + 1 };
            }),
        );
    }

    updateRole(id: number, dto: any): Promise<Role> {
        const role = rolesMock.find((role) => role.id === id);
        const roleUpdate = Object.assign(role, dto);
        return Promise.resolve(roleUpdate);
    }

    deleteRole(id: number): Promise<Role> {
        const role = rolesMock.find((role) => role.id === id);
        return Promise.resolve(role);
    }
}
