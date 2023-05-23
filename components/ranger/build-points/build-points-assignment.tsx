'use client'

import { useMemo } from 'react'
import { Character, CharacterBpLookup } from '../../../graphql/generated/graphql'
import Card from '../../parts/card'
import { useRangerApi } from '../ranger-api'
import AssignmentSection from './assignment-section'
import { BP_ASSIGNABLE_ATTRS_KEYS } from './types'

export default function BuildPointsAssignment() {
  const { data: ranger } = useRangerApi().getRangerById

  const bpLookupRecord = useMemo(() => {
    return ranger?.characterById?.characterBpLookupsByCharacterId.nodes[0] ?? {}
  }, [ ranger?.characterById?.characterBpLookupsByCharacterId.nodes ]) as CharacterBpLookup

  // can't do anything here unless this is available.
  if (!ranger?.characterById?.characterBpLookupsByCharacterId.nodes[0]) {
    return null
  }

  return (
    <Card>
      <table className='table-auto border-collapse'>
        <tbody>
          {Object.values(BP_ASSIGNABLE_ATTRS_KEYS).map(attr => (
            <AssignmentSection
              key={attr}
              ranger={ranger.characterById as Character}
              bpLookupRecord={bpLookupRecord}
              attributeKey={attr}
            />
          ))}
        </tbody>
      </table>
    </Card>
  )
}
