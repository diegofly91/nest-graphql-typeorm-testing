import { CreateRoleDto, FindByNameRoleDto, UpdateRoleDto } from '../dtos';
import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { RoleInterfaceRepository } from '../interfaces/index';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from '@/modules/shared/enums';
import { Role } from '../entities';

@Injectable()
export class RoleRepository<Role> implements RoleInterfaceRepository<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

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

  async findOneByName({ name }: FindByNameRoleDto): Promise<Role> {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.status = :status AND role.name  = :name', {
        status: Status.ACTIVE,
        name,
      })
      .getOne();
    if (!role) throw new NotFoundException('The role is not exists');
    return role;
  }

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleExist(dto);
    if (role) throw new BadRequestException('The role is already registered');
    const { raw } = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(dto)
      .execute();
    return raw;
  }

  async createRoles(roles: CreateRoleDto[]): Promise<Role[]> {
    const { raw } = await this.roleRepository
      .createQueryBuilder()
      .insert()
      .into(Role)
      .values(roles)
      .execute();
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
    if (!roleId) throw new BadRequestException('The role ID is required');
    const role = await this.getRoleById(roleId);
    const roleDeleted = await this.roleRepository.remove(role);
    return roleDeleted;
  }

  async roleExist({ name }: FindByNameRoleDto): Promise<boolean> {
    const role = await this.roleRepository
      .createQueryBuilder('role')
      .where('role.name = :name', { name })
      .getOne();
    return !!role;
  }
}
