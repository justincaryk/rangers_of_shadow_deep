import { UserRole } from '../../graphql/generated/graphql'

export enum PUBLIC_LINK_ROUTES {
  SIGN_IN = '/auth/signin',
  SIGN_OUT = '/auth/signout',
  SIGN_UP = '/auth/signup',
  AUTH = '/',
}

export enum PRIVATE_LINK_ROUTES {
  DASHBOARD = '/dashboard',
  CREATE_RANGER = '/create/ranger/[id]',
  CREATE_COMPANIONS = '/create/companions',
  ADMIN = '/admin',
}

export type RouteType = {
  link: PRIVATE_LINK_ROUTES | PUBLIC_LINK_ROUTES
  text?: string
  hasNav: boolean
}

export type PublicRouteType = RouteType
export type PrivateRouteType = RouteType & {
  home?: boolean
  permission: UserRole[]
}
