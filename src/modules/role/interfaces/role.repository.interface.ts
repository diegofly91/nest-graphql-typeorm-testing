import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { Role } from '../entities';

export interface RoleInterfaceRepository<Role> {
    getRoles(): Promise<Role[]>;
    getRoleById(roleId: number): Promise<Role>;
    createRole(dto: CreateRoleDto): Promise<Role>;
    createRoles(dto: CreateRoleDto[]): Promise<Role[]>;
    updateRole(roleId: number, dto: UpdateRoleDto): Promise<Role>;
    deleteRole(roleId: number): Promise<Role>;
}
