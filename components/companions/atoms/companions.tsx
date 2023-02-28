import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { Companion } from '../../data'

export const useCompanions = atomWithReset<Companion[]>([])

export const useAddCompanion = atom(null, (get, set, companion: Companion) => {
  set(useCompanions, [ ...get(useCompanions), companion ])
})

export const useDeleteCompanion = atom(
  null,
  (get, set, companion: Companion) => {
    const current = get(useCompanions)
    let removed = false
    const filtered = current.filter(purchased => {
      if (purchased.name === companion.name && !removed) {
        return false
      }
      return true
    })
    set(useCompanions, filtered)
  }
)
