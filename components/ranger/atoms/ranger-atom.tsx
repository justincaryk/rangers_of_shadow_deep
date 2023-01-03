import { atom } from 'jotai'
import { BASE_BUILD_POINTS, MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS } from '../rules/rules'

export const buildPointsAtom = atom(BASE_BUILD_POINTS)

export const useBuildPoints = atom(
    get => get(buildPointsAtom),
    (get, set, modifier: number) => {
        set(buildPointsAtom, get(buildPointsAtom) - modifier)
    }
)

export const bpForHeroicSpells = atom(MAX_BP_FOR_HEROIC_ACTIONS_AND_SPELLS)

export const useBpForHeroicSpells = atom(
    get => get(bpForHeroicSpells),
    (get, set, modifier: number) => {
        set(bpForHeroicSpells, get(bpForHeroicSpells) - modifier)
    }
)