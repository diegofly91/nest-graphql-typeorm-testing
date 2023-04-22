import { CreateRoleDto, UpdateRoleDto } from '../dtos';
import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { IRole, IRoleRepository } from '../interfaces/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities';

@Injectable()
export class RoleRepository extends Repository<Role> implements IRoleRepository<IRole> {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {
        super(roleRepository.target, roleRepository.manager, roleRepository.queryRunner);
    }

    async getRoles(): Promise<Role[]> {
        return await this.roleRepository.createQueryBuilder('role').getMany();
    }

    async getRoleById(roleId: number): Promise<Role> {
        if (!roleId) throw new BadRequestException('The role ID is required');
        const role = await this.roleRepository
            .createQueryBuilder('role')
            .where('role.id = :roleId', { roleId })
            .getOne();
        if (!role) throw new NotFoundException('The role is not exists');
        return role;
    }

    async getRoleByName(roleName: string): Promise<Role> {
        if (!roleName) throw new BadRequestException('The role name is required');
        const role = await this.roleRepository
            .createQueryBuilder('role')
            .where('role.name = :roleName', { roleName })
            .getOne();
        if (!role) throw new NotFoundException('The role is not exists');
        return role;
    }

    async createRole(dto: CreateRoleDto): Promise<Role> {
        const { raw } = await this.roleRepository.createQueryBuilder().insert().into(Role).values(dto).execute();
        return raw;
    }

    async createRoles(roles: CreateRoleDto[]): Promise<Role[]> {
        const { raw } = await this.roleRepository.createQueryBuilder().insert().into(Role).values(roles).execute();
        return raw;
    }

    async updateRole(roleId: number, dto: UpdateRoleDto): Promise<Role> {
        if (!roleId) throw new BadRequestException('The role ID is required');
        const role = await this.getRoleById(roleId);
        const roleToUpdate = Object.assign(role, dto);
        const roleUpdated = await this.roleRepository.save(roleToUpdate);
        return roleUpdated;
    }

    async deleteRole(roleId: number): Promise<Role> {
        const role = await this.getRoleById(roleId);
        return await this.roleRepository.remove(role);
    }
}
