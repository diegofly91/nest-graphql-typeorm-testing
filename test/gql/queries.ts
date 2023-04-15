import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
    Image: any;
    VideoFile: any;
};

export type CreateUserDto = {
    email: Scalars['String'];
    password: Scalars['String'];
    roleId: Scalars['Int'];
    status?: InputMaybe<Status>;
};

export type InputProfileUserDto = {
    address?: InputMaybe<Scalars['String']>;
    firstname?: InputMaybe<Scalars['String']>;
    lastname?: InputMaybe<Scalars['String']>;
    phone?: InputMaybe<Scalars['String']>;
};

/**  Input by Id  */
export type JokerById = {
    id: Scalars['Int'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
    deleteUser: User;
    updateProfileUser: Profile;
};

export type MutationCreateUserArgs = {
    input: CreateUserDto;
    inputPro: InputProfileUserDto;
};

export type MutationDeleteUserArgs = {
    id: Scalars['Int'];
};

export type MutationUpdateProfileUserArgs = {
    input: InputProfileUserDto;
};

/**  Input Options  */
export type Options = {
    deleted?: InputMaybe<Scalars['Boolean']>;
    isActive?: InputMaybe<Scalars['Boolean']>;
    status?: InputMaybe<Status>;
};

/**  Input de paginacion   */
export type Pagination = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};

export type Profile = {
    __typename?: 'Profile';
    address?: Maybe<Scalars['String']>;
    createdAt: Scalars['String'];
    firstname?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    lastname?: Maybe<Scalars['String']>;
    phone?: Maybe<Scalars['String']>;
    updatedAt: Scalars['String'];
    userId: Scalars['Int'];
};

export type Query = {
    __typename?: 'Query';
    getProfileUserById?: Maybe<Profile>;
    getRoleById: Role;
    getRoles: Array<Role>;
    getUser: User;
    getUsers: Array<User>;
};

export type QueryGetProfileUserByIdArgs = {
    userId: Scalars['Int'];
};

export type QueryGetRoleByIdArgs = {
    id: Scalars['Int'];
};

export type QueryGetUserArgs = {
    id: Scalars['Int'];
};

export type Role = {
    __typename?: 'Role';
    createdAt?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    name: Scalars['String'];
    updatedAt?: Maybe<Scalars['Date']>;
};

export enum Status {
    Active = 'ACTIVE',
    Deleted = 'DELETED',
    Inactive = 'INACTIVE',
    Preactive = 'PREACTIVE',
}

export type User = {
    __typename?: 'User';
    createdAt?: Maybe<Scalars['String']>;
    email: Scalars['String'];
    id: Scalars['Int'];
    password?: Maybe<Scalars['String']>;
    profile?: Maybe<Profile>;
    role: Role;
    roleId?: Maybe<Scalars['Int']>;
    status?: Maybe<Status>;
    updatedAt?: Maybe<Scalars['String']>;
};

/**  Input para   */
export type WithAssocOptions = {
    creates?: InputMaybe<Array<InputMaybe<JokerById>>>;
    deletes?: InputMaybe<Array<InputMaybe<JokerById>>>;
};

export type GetRoleByIdQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type GetRoleByIdQuery = {
    __typename?: 'Query';
    getRoleById: {
        __typename?: 'Role';
        id: number;
        name: string;
        description?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
    };
};

export type GetRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRolesQuery = {
    __typename?: 'Query';
    getRoles: Array<{
        __typename?: 'Role';
        id: number;
        name: string;
        description?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
    }>;
};

export const GetRoleByIdDocument = gql`
    query getRoleById($id: Int!) {
        getRoleById(id: $id) {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`;
export const GetRolesDocument = gql`
    query getRoles {
        getRoles {
            id
            name
            description
            createdAt
            updatedAt
        }
    }
`;

export type SdkFunctionWrapper = <T>(
    action: (requestHeaders?: Record<string, string>) => Promise<T>,
    operationName: string,
    operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
    return {
        getRoleById(
            variables: GetRoleByIdQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<GetRoleByIdQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<GetRoleByIdQuery>(GetRoleByIdDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'getRoleById',
                'query',
            );
        },
        getRoles(
            variables?: GetRolesQueryVariables,
            requestHeaders?: Dom.RequestInit['headers'],
        ): Promise<GetRolesQuery> {
            return withWrapper(
                (wrappedRequestHeaders) =>
                    client.request<GetRolesQuery>(GetRolesDocument, variables, {
                        ...requestHeaders,
                        ...wrappedRequestHeaders,
                    }),
                'getRoles',
                'query',
            );
        },
    };
}
export type Sdk = ReturnType<typeof getSdk>;
