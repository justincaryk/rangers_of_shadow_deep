import { useAtom } from 'jotai'
import { useBuildPoints } from './ranger/atoms/build-points'

export const NAV_TEXT_STYLE =
  'text-dirty-orange font-roboto uppercase hover:text-hover-white hover:no-underline cursor-pointer outline-none'

export function objectKeys<Obj extends object>(obj: Obj): (keyof Obj)[] {
  return Object.keys(obj) as (keyof Obj)[]
}

export function useGetTrueAvailBp(minorBp: number) {
  const [ totalBp ] = useAtom(useBuildPoints)

  if (totalBp > minorBp) {
    return minorBp
  } else {
    return totalBp
  }
}
