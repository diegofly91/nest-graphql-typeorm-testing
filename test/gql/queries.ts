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
  createdAt?: Maybe<Scalars['Date']>;
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastname?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
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
  Preactive = 'PREACTIVE'
}

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['Date']>;
  email: Scalars['String'];
  id: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  role: Role;
  roleId?: Maybe<Scalars['Int']>;
  status?: Maybe<Status>;
  updatedAt?: Maybe<Scalars['Date']>;
};

/**  Input para   */
export type WithAssocOptions = {
  creates?: InputMaybe<Array<InputMaybe<JokerById>>>;
  deletes?: InputMaybe<Array<InputMaybe<JokerById>>>;
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserDto;
  inputPro: InputProfileUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, password?: string | null, status?: Status | null, roleId?: number | null, createdAt?: any | null, updatedAt?: any | null, role: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }, profile?: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: number, email: string, password?: string | null, status?: Status | null, roleId?: number | null, createdAt?: any | null, updatedAt?: any | null, role: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }, profile?: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type UpdateProfileUserMutationVariables = Exact<{
  input: InputProfileUserDto;
}>;


export type UpdateProfileUserMutation = { __typename?: 'Mutation', updateProfileUser: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetProfileUserByIdQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type GetProfileUserByIdQuery = { __typename?: 'Query', getProfileUserById?: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type GetRoleByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetRoleByIdQuery = { __typename?: 'Query', getRoleById: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null } };

export type GetRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: Array<{ __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }> };

export type GetUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: number, email: string, password?: string | null, status?: Status | null, roleId?: number | null, createdAt?: any | null, updatedAt?: any | null, role: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }, profile?: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null } };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: number, email: string, password?: string | null, status?: Status | null, roleId?: number | null, createdAt?: any | null, updatedAt?: any | null, role: { __typename?: 'Role', id: number, name: string, description?: string | null, createdAt?: any | null, updatedAt?: any | null }, profile?: { __typename?: 'Profile', id: number, userId: number, firstname?: string | null, lastname?: string | null, address?: string | null, phone?: string | null, createdAt?: any | null, updatedAt?: any | null } | null }> };


export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserDto!, $inputPro: InputProfileUserDto!) {
  createUser(input: $input, inputPro: $inputPro) {
    id
    email
    password
    status
    roleId
    createdAt
    updatedAt
    role {
      id
      name
      description
      createdAt
      updatedAt
    }
    profile {
      id
      userId
      firstname
      lastname
      address
      phone
      createdAt
      updatedAt
    }
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
    email
    password
    status
    roleId
    createdAt
    updatedAt
    role {
      id
      name
      description
      createdAt
      updatedAt
    }
    profile {
      id
      userId
      firstname
      lastname
      address
      phone
      createdAt
      updatedAt
    }
  }
}
    `;
export const UpdateProfileUserDocument = gql`
    mutation updateProfileUser($input: InputProfileUserDto!) {
  updateProfileUser(input: $input) {
    id
    userId
    firstname
    lastname
    address
    phone
    createdAt
    updatedAt
  }
}
    `;
export const GetProfileUserByIdDocument = gql`
    query getProfileUserById($userId: Int!) {
  getProfileUserById(userId: $userId) {
    id
    userId
    firstname
    lastname
    address
    phone
    createdAt
    updatedAt
  }
}
    `;
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
export const GetUserDocument = gql`
    query getUser($id: Int!) {
  getUser(id: $id) {
    id
    email
    password
    status
    roleId
    createdAt
    updatedAt
    role {
      id
      name
      description
      createdAt
      updatedAt
    }
    profile {
      id
      userId
      firstname
      lastname
      address
      phone
      createdAt
      updatedAt
    }
  }
}
    `;
export const GetUsersDocument = gql`
    query getUsers {
  getUsers {
    id
    email
    password
    status
    roleId
    createdAt
    updatedAt
    role {
      id
      name
      description
      createdAt
      updatedAt
    }
    profile {
      id
      userId
      firstname
      lastname
      address
      phone
      createdAt
      updatedAt
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createUser(variables: CreateUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateUserMutation>(CreateUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createUser', 'mutation');
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>(DeleteUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteUser', 'mutation');
    },
    updateProfileUser(variables: UpdateProfileUserMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateProfileUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfileUserMutation>(UpdateProfileUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfileUser', 'mutation');
    },
    getProfileUserById(variables: GetProfileUserByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetProfileUserByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileUserByIdQuery>(GetProfileUserByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProfileUserById', 'query');
    },
    getRoleById(variables: GetRoleByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRoleByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRoleByIdQuery>(GetRoleByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRoleById', 'query');
    },
    getRoles(variables?: GetRolesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetRolesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetRolesQuery>(GetRolesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getRoles', 'query');
    },
    getUser(variables: GetUserQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUserQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserQuery>(GetUserDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUser', 'query');
    },
    getUsers(variables?: GetUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUsersQuery>(GetUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;