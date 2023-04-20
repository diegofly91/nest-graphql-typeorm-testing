import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services';
import { AuthResolver } from './resolvers/auth.resolver';
import { JwtStrategy, LocalStrategy } from './strategies';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guards';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get('JWT_SECRET'),
                signOptions: { expiresIn: '10d' },
            }),
        }),
    ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        AuthResolver,
        {
            provide: APP_INTERCEPTOR,
            useClass: RolesGuard,
        },
    ],
    exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
