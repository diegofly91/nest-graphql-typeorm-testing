import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

export const GraphQL = GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        installSubscriptionHandlers: true,
        typePaths: ['./**/graphql/*.graphql'],
        debug: configService.get('GRAPHQL_DEGUB') === 'true',
        playground: configService.get('GRAPHQL_DEGUB') === 'true',
        subscriptions: {
            'graphql-ws': {
                path: '/subscriptions',
            },
            'subscriptions-transport-ws': true,
        },
        context: ({ req, connection }) => (connection ? { headers: connection.context } : { headers: req.headers }),
        formatError: (error) => new Error(error.message),
    }),
    inject: [ConfigService],
});
