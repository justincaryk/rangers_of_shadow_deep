import { UserRole } from '../../graphql/generated/graphql'

export enum PUBLIC_LINK_ROUTES {
  SIGN_IN = '/auth/signin',
  SIGN_OUT = '/auth/signout',
  SIGN_UP = '/auth/signup',
  AUTH = '/',
}

export enum PRIVATE_LINK_ROUTES {
  DASHBOARD = '/dashboard',
  A_RANGER = '/build/ranger/[id]',
  A_COMPANION = '/build/companion/[id]',
  COMPANIONS = '/game-rules/companions',
  EQUIPMENT = '/game-rules/equipment',
  SPELLS = '/game-rules/spells',
  HEROIC_ACTIONS = '/game-rules/heroic-actions',
  INJURIES = '/game-rules/injuries',
  PROGRESSION = '/game-rules/progression',
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
