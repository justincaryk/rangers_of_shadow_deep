import { UserRole } from '../../graphql/generated/graphql'

export const PUBLIC_ROUTE_URLS = {
  SIGN_IN: '/auth/signin',
  SIGN_OUT: '/auth/signout',
  SIGN_UP: '/auth/signup',
  AUTH: '/',
}

export const DYNAMIC_ROUTE_BASE_URLS = {
  A_RANGER: '/forge/ranger',
  A_COMPANION: '/forge/companion',
}
export const PRIVATE_ROUTE_URLS = {
  DASHBOARD: '/dashboard',
  A_RANGER: `${DYNAMIC_ROUTE_BASE_URLS.A_RANGER}/[memberId]`,
  A_COMPANION: `${DYNAMIC_ROUTE_BASE_URLS.A_COMPANION}/[memberId]`,
  COMPANIONS: '/game-rules/companions',
  EQUIPMENT: '/game-rules/equipment',
  SPELLS: '/game-rules/spells',
  HEROIC_ACTIONS: '/game-rules/heroic-actions',
  INJURIES: '/game-rules/injuries',
  PROGRESSION: '/game-rules/progression',
  ADMIN: '/admin',
}

export type PublicPathname = (typeof PUBLIC_ROUTE_URLS)[keyof typeof PUBLIC_ROUTE_URLS]
export type PrivatePathname = (typeof PRIVATE_ROUTE_URLS)[keyof typeof PRIVATE_ROUTE_URLS]

export type RouteType = {
  link: PublicPathname | PrivatePathname
  text?: string
  hasNav: boolean
}

export type PublicRouteType = RouteType
export type PrivateRouteType = RouteType & {
  home?: boolean
  permission: UserRole[]
}
