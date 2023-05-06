import { UsePipes, ValidationPipe, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { AuthService } from '../services';
import { LoginUserDto, LoginSocialDto, RegisterSocialDto } from '../dtos';
import { User } from '@/modules/user/entities';
import { AuthGuard, LocalAuthGuard, SocialAuthGuard } from '../guards';
import { IToken, IUserPayload } from '../interfaces';
import { SocialProfile } from '../decorators';
import { Profile } from 'passport';
import { CreateUserSocialInterceptor } from '@/modules/user/interceptors';
import { MyExceptionsEmailFilter } from '../filters/email.filter';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Query()
    @UseGuards(AuthGuard)
    userCurrentData(@Context('user') user: IUserPayload) {
        return user;
    }

    @UseGuards(LocalAuthGuard)
    @UsePipes(new ValidationPipe())
    @Mutation(() => User)
    async loginUser(@Args('input') { email }: LoginUserDto): Promise<IToken> {
        return await this.authService.payloadData(email);
    }

    @UseGuards(SocialAuthGuard)
    @UseFilters(MyExceptionsEmailFilter)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Boolean)
    async loginSocial(@Args('input') input: LoginSocialDto, @SocialProfile() { email }: Profile): Promise<IToken> {
        return await this.authService.payloadData(email);
    }

    @UseGuards(SocialAuthGuard)
    @UseInterceptors(CreateUserSocialInterceptor)
    @UsePipes(new ValidationPipe())
    @Mutation(() => Boolean)
    async registerSocial(
        @Args('input') input: RegisterSocialDto,
        @SocialProfile() { email }: Profile,
    ): Promise<IToken> {
        return await this.authService.payloadData(email);
    }
}
