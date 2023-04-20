import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLFormattedError } from 'graphql';

export const GraphQL = GraphQLModule.forRootAsync<ApolloDriverConfig>({
    driver: ApolloDriver,
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
        installSubscriptionHandlers: false,
        typePaths: ['./**/graphql/*.graphql'],
        cache: 'bounded',
        path: '/',
        debug: configService.get('GRAPHQL_DEGUB') === 'true',
        playground: configService.get('GRAPHQL_DEGUB') === 'true',
        // subscriptions: {
        //     'graphql-ws': {
        //         path: '/subscriptions',
        //     },
        //     'subscriptions-transport-ws': true,
        // },
        context: ({ req, connection }) => (connection ? { headers: connection.context } : { headers: req.headers }),
        formatError: ({ message }: GraphQLFormattedError) => {
            return {
                message,
            };
        },
    }),
    inject: [ConfigService],
});
