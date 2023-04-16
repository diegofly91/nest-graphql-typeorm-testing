import { CreateRoleDto, UpdateRoleDto } from '../dtos';
//import { Role } from '../entities';
import { IRole } from './role.interface';
export interface RoleInterfaceRepository<IRole> {
    getRoles(): Promise<IRole[]>;
    getRoleById(roleId: number): Promise<IRole>;
    createRole(dto: CreateRoleDto): Promise<IRole>;
    createRoles(dto: CreateRoleDto[]): Promise<IRole[]>;
    updateRole(roleId: number, dto: UpdateRoleDto): Promise<IRole>;
    deleteRole(roleId: number): Promise<IRole>;
}
