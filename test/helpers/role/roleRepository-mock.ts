import { CreateRoleDto } from '@/modules/role/dtos';
import { rolesMock } from './roles.mock';
import { IRole, RoleInterfaceRepository } from '@/modules/role/interfaces';

export class RoleRepositoryMock implements RoleInterfaceRepository<IRole> {
    getRoles(): Promise<IRole[]> {
        return Promise.resolve(rolesMock);
    }

    getRoleById(id: number): Promise<IRole> {
        return Promise.resolve(rolesMock.find((role) => role.id === id));
    }

    createRole(dto: CreateRoleDto): Promise<IRole> {
        return Promise.resolve({ ...dto, id: rolesMock.length + 1 });
    }

    createRoles(dto: CreateRoleDto[]): Promise<IRole[]> {
        return Promise.resolve(
            dto.map((role) => {
                return { ...role, id: rolesMock.length + 1 };
            }),
        );
    }

    updateRole(id: number, dto: CreateRoleDto): Promise<IRole> {
        const role = rolesMock.find((role) => role.id === id);
        const roleUpdate = Object.assign(role, dto);
        return Promise.resolve(roleUpdate);
    }

    deleteRole(id: number): Promise<IRole> {
        const role = rolesMock.find((role) => role.id === id);
        return Promise.resolve(role);
    }
}
