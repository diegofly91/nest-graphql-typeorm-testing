import { CreateRoleDto, UpdateRoleDto } from '../dtos';
export interface RoleInterfaceRepository<IRole> {
    getRoles(): Promise<IRole[]>;
    getRoleById(roleId: number): Promise<IRole>;
    getRoleByName(roleName: string): Promise<IRole>;
    createRole(dto: CreateRoleDto): Promise<IRole>;
    createRoles(dto: CreateRoleDto[]): Promise<IRole[]>;
    updateRole(roleId: number, dto: UpdateRoleDto): Promise<IRole>;
    deleteRole(roleId: number): Promise<IRole>;
}
