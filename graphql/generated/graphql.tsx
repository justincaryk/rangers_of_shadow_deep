import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  Datetime: any;
  JwtToken: any;
  UUID: any;
};

/** All input for the create `KnexMigration` mutation. */
export type CreateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `KnexMigration` to be created by this mutation. */
  knexMigration: KnexMigrationInput;
};

/** The output of our create `KnexMigration` mutation. */
export type CreateKnexMigrationPayload = {
  __typename?: 'CreateKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigration` that was created by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `KnexMigration` mutation. */
export type CreateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `KnexMigrationsLock` to be created by this mutation. */
  knexMigrationsLock: KnexMigrationsLockInput;
};

/** The output of our create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockPayload = {
  __typename?: 'CreateKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigrationsLock` that was created by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the create `Minion` mutation. */
export type CreateMinionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Minion` to be created by this mutation. */
  minion: MinionInput;
};

/** The output of our create `Minion` mutation. */
export type CreateMinionPayload = {
  __typename?: 'CreateMinionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Minion` that was created by this mutation. */
  minion?: Maybe<Minion>;
  /** An edge for our `Minion`. May be used by Relay 1. */
  minionEdge?: Maybe<MinionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Minion` mutation. */
export type CreateMinionPayloadMinionEdgeArgs = {
  orderBy?: InputMaybe<Array<MinionsOrderBy>>;
};

/** All input for the create `Wizard` mutation. */
export type CreateWizardInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Wizard` to be created by this mutation. */
  wizard: WizardInput;
};

/** The output of our create `Wizard` mutation. */
export type CreateWizardPayload = {
  __typename?: 'CreateWizardPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Minion` that is related to this `Wizard`. */
  minionByUserId?: Maybe<Minion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Wizard` that was created by this mutation. */
  wizard?: Maybe<Wizard>;
  /** An edge for our `Wizard`. May be used by Relay 1. */
  wizardEdge?: Maybe<WizardsEdge>;
};


/** The output of our create `Wizard` mutation. */
export type CreateWizardPayloadWizardEdgeArgs = {
  orderBy?: InputMaybe<Array<WizardsOrderBy>>;
};

/** All input for the `deleteKnexMigrationById` mutation. */
export type DeleteKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteKnexMigration` mutation. */
export type DeleteKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigration` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `KnexMigration` mutation. */
export type DeleteKnexMigrationPayload = {
  __typename?: 'DeleteKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedKnexMigrationId?: Maybe<Scalars['ID']>;
  /** The `KnexMigration` that was deleted by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `KnexMigration` mutation. */
export type DeleteKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `deleteKnexMigrationsLockByIndex` mutation. */
export type DeleteKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  index: Scalars['Int'];
};

/** All input for the `deleteKnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigrationsLock` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `KnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockPayload = {
  __typename?: 'DeleteKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedKnexMigrationsLockId?: Maybe<Scalars['ID']>;
  /** The `KnexMigrationsLock` that was deleted by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `KnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `deleteMinionById` mutation. */
export type DeleteMinionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMinionByUserName` mutation. */
export type DeleteMinionByUserNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  userName: Scalars['String'];
};

/** All input for the `deleteMinion` mutation. */
export type DeleteMinionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Minion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Minion` mutation. */
export type DeleteMinionPayload = {
  __typename?: 'DeleteMinionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedMinionId?: Maybe<Scalars['ID']>;
  /** The `Minion` that was deleted by this mutation. */
  minion?: Maybe<Minion>;
  /** An edge for our `Minion`. May be used by Relay 1. */
  minionEdge?: Maybe<MinionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Minion` mutation. */
export type DeleteMinionPayloadMinionEdgeArgs = {
  orderBy?: InputMaybe<Array<MinionsOrderBy>>;
};

/** All input for the `deleteWizardById` mutation. */
export type DeleteWizardByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteWizardByUserId` mutation. */
export type DeleteWizardByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  userId: Scalars['UUID'];
};

/** All input for the `deleteWizard` mutation. */
export type DeleteWizardInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Wizard` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Wizard` mutation. */
export type DeleteWizardPayload = {
  __typename?: 'DeleteWizardPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedWizardId?: Maybe<Scalars['ID']>;
  /** Reads a single `Minion` that is related to this `Wizard`. */
  minionByUserId?: Maybe<Minion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Wizard` that was deleted by this mutation. */
  wizard?: Maybe<Wizard>;
  /** An edge for our `Wizard`. May be used by Relay 1. */
  wizardEdge?: Maybe<WizardsEdge>;
};


/** The output of our delete `Wizard` mutation. */
export type DeleteWizardPayloadWizardEdgeArgs = {
  orderBy?: InputMaybe<Array<WizardsOrderBy>>;
};

export type KnexMigration = Node & {
  __typename?: 'KnexMigration';
  batch?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  migrationTime?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `KnexMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationCondition = {
  /** Checks for equality with the object’s `batch` field. */
  batch?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `migrationTime` field. */
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `KnexMigration` */
export type KnexMigrationInput = {
  batch?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `KnexMigration`. Fields that are set will be updated. */
export type KnexMigrationPatch = {
  batch?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `KnexMigration` values. */
export type KnexMigrationsConnection = {
  __typename?: 'KnexMigrationsConnection';
  /** A list of edges which contains the `KnexMigration` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsEdge>;
  /** A list of `KnexMigration` objects. */
  nodes: Array<Maybe<KnexMigration>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KnexMigration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KnexMigration` edge in the connection. */
export type KnexMigrationsEdge = {
  __typename?: 'KnexMigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KnexMigration` at the end of the edge. */
  node?: Maybe<KnexMigration>;
};

export type KnexMigrationsLock = Node & {
  __typename?: 'KnexMigrationsLock';
  index: Scalars['Int'];
  isLocked?: Maybe<Scalars['Int']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `KnexMigrationsLock` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationsLockCondition = {
  /** Checks for equality with the object’s `index` field. */
  index?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isLocked` field. */
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** An input for mutations affecting `KnexMigrationsLock` */
export type KnexMigrationsLockInput = {
  index?: InputMaybe<Scalars['Int']>;
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** Represents an update to a `KnexMigrationsLock`. Fields that are set will be updated. */
export type KnexMigrationsLockPatch = {
  index?: InputMaybe<Scalars['Int']>;
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `KnexMigrationsLock` values. */
export type KnexMigrationsLocksConnection = {
  __typename?: 'KnexMigrationsLocksConnection';
  /** A list of edges which contains the `KnexMigrationsLock` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsLocksEdge>;
  /** A list of `KnexMigrationsLock` objects. */
  nodes: Array<Maybe<KnexMigrationsLock>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KnexMigrationsLock` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KnexMigrationsLock` edge in the connection. */
export type KnexMigrationsLocksEdge = {
  __typename?: 'KnexMigrationsLocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KnexMigrationsLock` at the end of the edge. */
  node?: Maybe<KnexMigrationsLock>;
};

/** Methods to use when ordering `KnexMigrationsLock`. */
export enum KnexMigrationsLocksOrderBy {
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  IsLockedAsc = 'IS_LOCKED_ASC',
  IsLockedDesc = 'IS_LOCKED_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `KnexMigration`. */
export enum KnexMigrationsOrderBy {
  BatchAsc = 'BATCH_ASC',
  BatchDesc = 'BATCH_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MigrationTimeAsc = 'MIGRATION_TIME_ASC',
  MigrationTimeDesc = 'MIGRATION_TIME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Minion = Node & {
  __typename?: 'Minion';
  id: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  password?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  userName: Scalars['String'];
  /** Reads a single `Wizard` that is related to this `Minion`. */
  wizardByUserId?: Maybe<Wizard>;
  /**
   * Reads and enables pagination through a set of `Wizard`.
   * @deprecated Please use wizardByUserId instead
   */
  wizardsByUserId: WizardsConnection;
};


export type MinionWizardsByUserIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<WizardCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WizardsOrderBy>>;
};

/** A condition to be used against `Minion` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MinionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `password` field. */
  password?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `role` field. */
  role?: InputMaybe<UserRole>;
  /** Checks for equality with the object’s `userName` field. */
  userName?: InputMaybe<Scalars['String']>;
};

/** An input for mutations affecting `Minion` */
export type MinionInput = {
  id?: InputMaybe<Scalars['UUID']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  userName: Scalars['String'];
};

/** Represents an update to a `Minion`. Fields that are set will be updated. */
export type MinionPatch = {
  id?: InputMaybe<Scalars['UUID']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
  userName?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `Minion` values. */
export type MinionsConnection = {
  __typename?: 'MinionsConnection';
  /** A list of edges which contains the `Minion` and cursor to aid in pagination. */
  edges: Array<MinionsEdge>;
  /** A list of `Minion` objects. */
  nodes: Array<Maybe<Minion>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Minion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Minion` edge in the connection. */
export type MinionsEdge = {
  __typename?: 'MinionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Minion` at the end of the edge. */
  node?: Maybe<Minion>;
};

/** Methods to use when ordering `Minion`. */
export enum MinionsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PasswordAsc = 'PASSWORD_ASC',
  PasswordDesc = 'PASSWORD_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RoleAsc = 'ROLE_ASC',
  RoleDesc = 'ROLE_DESC',
  UserNameAsc = 'USER_NAME_ASC',
  UserNameDesc = 'USER_NAME_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `KnexMigration`. */
  createKnexMigration?: Maybe<CreateKnexMigrationPayload>;
  /** Creates a single `KnexMigrationsLock`. */
  createKnexMigrationsLock?: Maybe<CreateKnexMigrationsLockPayload>;
  /** Creates a single `Minion`. */
  createMinion?: Maybe<CreateMinionPayload>;
  /** Creates a single `Wizard`. */
  createWizard?: Maybe<CreateWizardPayload>;
  /** Deletes a single `KnexMigration` using its globally unique id. */
  deleteKnexMigration?: Maybe<DeleteKnexMigrationPayload>;
  /** Deletes a single `KnexMigration` using a unique key. */
  deleteKnexMigrationById?: Maybe<DeleteKnexMigrationPayload>;
  /** Deletes a single `KnexMigrationsLock` using its globally unique id. */
  deleteKnexMigrationsLock?: Maybe<DeleteKnexMigrationsLockPayload>;
  /** Deletes a single `KnexMigrationsLock` using a unique key. */
  deleteKnexMigrationsLockByIndex?: Maybe<DeleteKnexMigrationsLockPayload>;
  /** Deletes a single `Minion` using its globally unique id. */
  deleteMinion?: Maybe<DeleteMinionPayload>;
  /** Deletes a single `Minion` using a unique key. */
  deleteMinionById?: Maybe<DeleteMinionPayload>;
  /** Deletes a single `Minion` using a unique key. */
  deleteMinionByUserName?: Maybe<DeleteMinionPayload>;
  /** Deletes a single `Wizard` using its globally unique id. */
  deleteWizard?: Maybe<DeleteWizardPayload>;
  /** Deletes a single `Wizard` using a unique key. */
  deleteWizardById?: Maybe<DeleteWizardPayload>;
  /** Deletes a single `Wizard` using a unique key. */
  deleteWizardByUserId?: Maybe<DeleteWizardPayload>;
  signin?: Maybe<SigninPayload>;
  signup?: Maybe<SignupPayload>;
  /** Updates a single `KnexMigration` using its globally unique id and a patch. */
  updateKnexMigration?: Maybe<UpdateKnexMigrationPayload>;
  /** Updates a single `KnexMigration` using a unique key and a patch. */
  updateKnexMigrationById?: Maybe<UpdateKnexMigrationPayload>;
  /** Updates a single `KnexMigrationsLock` using its globally unique id and a patch. */
  updateKnexMigrationsLock?: Maybe<UpdateKnexMigrationsLockPayload>;
  /** Updates a single `KnexMigrationsLock` using a unique key and a patch. */
  updateKnexMigrationsLockByIndex?: Maybe<UpdateKnexMigrationsLockPayload>;
  /** Updates a single `Minion` using its globally unique id and a patch. */
  updateMinion?: Maybe<UpdateMinionPayload>;
  /** Updates a single `Minion` using a unique key and a patch. */
  updateMinionById?: Maybe<UpdateMinionPayload>;
  /** Updates a single `Minion` using a unique key and a patch. */
  updateMinionByUserName?: Maybe<UpdateMinionPayload>;
  /** Updates a single `Wizard` using its globally unique id and a patch. */
  updateWizard?: Maybe<UpdateWizardPayload>;
  /** Updates a single `Wizard` using a unique key and a patch. */
  updateWizardById?: Maybe<UpdateWizardPayload>;
  /** Updates a single `Wizard` using a unique key and a patch. */
  updateWizardByUserId?: Maybe<UpdateWizardPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKnexMigrationArgs = {
  input: CreateKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKnexMigrationsLockArgs = {
  input: CreateKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMinionArgs = {
  input: CreateMinionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWizardArgs = {
  input: CreateWizardInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationArgs = {
  input: DeleteKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationByIdArgs = {
  input: DeleteKnexMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationsLockArgs = {
  input: DeleteKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationsLockByIndexArgs = {
  input: DeleteKnexMigrationsLockByIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMinionArgs = {
  input: DeleteMinionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMinionByIdArgs = {
  input: DeleteMinionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMinionByUserNameArgs = {
  input: DeleteMinionByUserNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWizardArgs = {
  input: DeleteWizardInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWizardByIdArgs = {
  input: DeleteWizardByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWizardByUserIdArgs = {
  input: DeleteWizardByUserIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSigninArgs = {
  input: SigninInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSignupArgs = {
  input: SignupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationArgs = {
  input: UpdateKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationByIdArgs = {
  input: UpdateKnexMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationsLockArgs = {
  input: UpdateKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationsLockByIndexArgs = {
  input: UpdateKnexMigrationsLockByIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMinionArgs = {
  input: UpdateMinionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMinionByIdArgs = {
  input: UpdateMinionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMinionByUserNameArgs = {
  input: UpdateMinionByUserNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWizardArgs = {
  input: UpdateWizardInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWizardByIdArgs = {
  input: UpdateWizardByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWizardByUserIdArgs = {
  input: UpdateWizardByUserIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `KnexMigration`. */
  allKnexMigrations?: Maybe<KnexMigrationsConnection>;
  /** Reads and enables pagination through a set of `KnexMigrationsLock`. */
  allKnexMigrationsLocks?: Maybe<KnexMigrationsLocksConnection>;
  /** Reads and enables pagination through a set of `Minion`. */
  allMinions?: Maybe<MinionsConnection>;
  /** Reads and enables pagination through a set of `Wizard`. */
  allWizards?: Maybe<WizardsConnection>;
  /** Reads a single `KnexMigration` using its globally unique `ID`. */
  knexMigration?: Maybe<KnexMigration>;
  knexMigrationById?: Maybe<KnexMigration>;
  /** Reads a single `KnexMigrationsLock` using its globally unique `ID`. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  knexMigrationsLockByIndex?: Maybe<KnexMigrationsLock>;
  /** Reads a single `Minion` using its globally unique `ID`. */
  minion?: Maybe<Minion>;
  minionById?: Maybe<Minion>;
  minionByUserName?: Maybe<Minion>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a single `Wizard` using its globally unique `ID`. */
  wizard?: Maybe<Wizard>;
  wizardById?: Maybe<Wizard>;
  wizardByUserId?: Maybe<Wizard>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<KnexMigrationCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsLocksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<KnexMigrationsLockCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMinionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MinionCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MinionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllWizardsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<WizardCondition>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WizardsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockByIndexArgs = {
  index: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMinionArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMinionByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMinionByUserNameArgs = {
  userName: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWizardArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWizardByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWizardByUserIdArgs = {
  userId: Scalars['UUID'];
};

/** All input for the `signin` mutation. */
export type SigninInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** The output of our `signin` mutation. */
export type SigninPayload = {
  __typename?: 'SigninPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `signup` mutation. */
export type SignupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

/** The output of our `signup` mutation. */
export type SignupPayload = {
  __typename?: 'SignupPayload';
  boolean?: Maybe<Scalars['Boolean']>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateKnexMigrationById` mutation. */
export type UpdateKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
};

/** All input for the `updateKnexMigration` mutation. */
export type UpdateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
  /** The globally unique `ID` which will identify a single `KnexMigration` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `KnexMigration` mutation. */
export type UpdateKnexMigrationPayload = {
  __typename?: 'UpdateKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigration` that was updated by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `KnexMigration` mutation. */
export type UpdateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `updateKnexMigrationsLockByIndex` mutation. */
export type UpdateKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  index: Scalars['Int'];
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
};

/** All input for the `updateKnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
  /** The globally unique `ID` which will identify a single `KnexMigrationsLock` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `KnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockPayload = {
  __typename?: 'UpdateKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigrationsLock` that was updated by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `KnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `updateMinionById` mutation. */
export type UpdateMinionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Minion` being updated. */
  minionPatch: MinionPatch;
};

/** All input for the `updateMinionByUserName` mutation. */
export type UpdateMinionByUserNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Minion` being updated. */
  minionPatch: MinionPatch;
  userName: Scalars['String'];
};

/** All input for the `updateMinion` mutation. */
export type UpdateMinionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Minion` being updated. */
  minionPatch: MinionPatch;
  /** The globally unique `ID` which will identify a single `Minion` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Minion` mutation. */
export type UpdateMinionPayload = {
  __typename?: 'UpdateMinionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Minion` that was updated by this mutation. */
  minion?: Maybe<Minion>;
  /** An edge for our `Minion`. May be used by Relay 1. */
  minionEdge?: Maybe<MinionsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Minion` mutation. */
export type UpdateMinionPayloadMinionEdgeArgs = {
  orderBy?: InputMaybe<Array<MinionsOrderBy>>;
};

/** All input for the `updateWizardById` mutation. */
export type UpdateWizardByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Wizard` being updated. */
  wizardPatch: WizardPatch;
};

/** All input for the `updateWizardByUserId` mutation. */
export type UpdateWizardByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  userId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Wizard` being updated. */
  wizardPatch: WizardPatch;
};

/** All input for the `updateWizard` mutation. */
export type UpdateWizardInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Wizard` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Wizard` being updated. */
  wizardPatch: WizardPatch;
};

/** The output of our update `Wizard` mutation. */
export type UpdateWizardPayload = {
  __typename?: 'UpdateWizardPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Minion` that is related to this `Wizard`. */
  minionByUserId?: Maybe<Minion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Wizard` that was updated by this mutation. */
  wizard?: Maybe<Wizard>;
  /** An edge for our `Wizard`. May be used by Relay 1. */
  wizardEdge?: Maybe<WizardsEdge>;
};


/** The output of our update `Wizard` mutation. */
export type UpdateWizardPayloadWizardEdgeArgs = {
  orderBy?: InputMaybe<Array<WizardsOrderBy>>;
};

export enum UserRole {
  Minion = 'MINION',
  Wizard = 'WIZARD'
}

export type Wizard = Node & {
  __typename?: 'Wizard';
  id: Scalars['UUID'];
  /** Reads a single `Minion` that is related to this `Wizard`. */
  minionByUserId?: Maybe<Minion>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId?: Maybe<Scalars['UUID']>;
};

/** A condition to be used against `Wizard` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type WizardCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['UUID']>;
};

/** An input for mutations affecting `Wizard` */
export type WizardInput = {
  id?: InputMaybe<Scalars['UUID']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** Represents an update to a `Wizard`. Fields that are set will be updated. */
export type WizardPatch = {
  id?: InputMaybe<Scalars['UUID']>;
  userId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `Wizard` values. */
export type WizardsConnection = {
  __typename?: 'WizardsConnection';
  /** A list of edges which contains the `Wizard` and cursor to aid in pagination. */
  edges: Array<WizardsEdge>;
  /** A list of `Wizard` objects. */
  nodes: Array<Maybe<Wizard>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Wizard` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Wizard` edge in the connection. */
export type WizardsEdge = {
  __typename?: 'WizardsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Wizard` at the end of the edge. */
  node?: Maybe<Wizard>;
};

/** Methods to use when ordering `Wizard`. */
export enum WizardsOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

export type SigninMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SigninMutation = { __typename?: 'Mutation', signin?: { __typename?: 'SigninPayload', jwtToken?: any | null } | null };

export type SignUpMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', signup?: { __typename?: 'SignupPayload', boolean?: boolean | null } | null };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'Query', allMinions?: { __typename?: 'MinionsConnection', nodes: Array<{ __typename?: 'Minion', id: any, userName: string } | null> } | null };


export const SigninDocument = `
    mutation Signin($username: String!, $password: String!) {
  signin(input: {password: $password, username: $username}) {
    jwtToken
  }
}
    `;
export const useSigninMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SigninMutation, TError, SigninMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SigninMutation, TError, SigninMutationVariables, TContext>(
      [ 'Signin' ],
      (variables?: SigninMutationVariables) => fetcher<SigninMutation, SigninMutationVariables>(client, SigninDocument, variables, headers)(),
      options
    );
export const SignUpDocument = `
    mutation SignUp($username: String!, $password: String!) {
  signup(input: {username: $username, password: $password}) {
    boolean
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      [ 'SignUp' ],
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(client, SignUpDocument, variables, headers)(),
      options
    );
export const MyQueryDocument = `
    query MyQuery {
  allMinions {
    nodes {
      id
      userName
    }
  }
}
    `;
export const useMyQueryQuery = <
      TData = MyQueryQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: MyQueryQueryVariables,
      options?: UseQueryOptions<MyQueryQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<MyQueryQuery, TError, TData>(
      variables === undefined ? [ 'MyQuery' ] : [ 'MyQuery', variables ],
      fetcher<MyQueryQuery, MyQueryQueryVariables>(client, MyQueryDocument, variables, headers),
      options
    );