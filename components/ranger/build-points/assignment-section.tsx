import classnames from 'classnames'

import Decrement from '../../parts/decrement'
import Increment from '../../parts/increment'
import { DECREASE, INCREASE } from '../../rules/creation-rules'

// hooks
import { useAtom } from 'jotai'
import { useRangerApi } from '../ranger-api'
import { useBuildPoints } from '../atoms/build-points'

// types
import { BP_ASSIGNABLE_ATTRS_KEYS, ATTR_TO_BP_LOOKUP_KEY_HASH } from './types'
import { Character, CharacterBpLookup } from '../../../graphql/generated/graphql'

interface Props {
  ranger: Character
  bpLookupRecord: CharacterBpLookup
  attributeKey: BP_ASSIGNABLE_ATTRS_KEYS
}

export default function AssignmentSection({ ranger, bpLookupRecord, attributeKey }: Props) {
  const [ totalBuildPoints ] = useAtom(useBuildPoints)
  const currentAttribute = ATTR_TO_BP_LOOKUP_KEY_HASH[attributeKey]

  const { mutate: mutateRanger, status: rangerLoadingStatus } = useRangerApi().updateRanger
  const { mutate: mutateBpLookup, status: bpLookupLoadingStatus } = useRangerApi().updateRangerBpAllottment

  const checkCanIncrement = () => {
    const allotted = bpLookupRecord[currentAttribute.bpVarKey]
    const isInbounds = allotted < currentAttribute.maxAllowed
    return totalBuildPoints > 0 && isInbounds
  }

  const checkCanDecrement = () => {
    const currentlyAllotted = bpLookupRecord[currentAttribute.bpVarKey]
    return currentlyAllotted > 0
  }

  const canIncrement = checkCanIncrement()
  const canDecrement = checkCanDecrement()

  const handleAllotBp = (modifier: number) => {
    if (rangerLoadingStatus === 'loading' && bpLookupLoadingStatus === 'loading') {
      return null
    }
    if (modifier === INCREASE && !canIncrement) {
      return null
    }
    if (modifier === DECREASE && !canDecrement) {
      return null
    }

    mutateBpLookup({
      lookupId: bpLookupRecord.id,
      [currentAttribute.bpMutateVarKey]: bpLookupRecord[currentAttribute.bpVarKey] + modifier,
    })

    mutateRanger({
      id: bpLookupRecord.characterId,
      patch: {
        [currentAttribute.characterVarKey]:
          currentAttribute.createConversionHelper?.(ranger[currentAttribute.characterVarKey], modifier) ??
          ranger[currentAttribute.characterVarKey] + modifier,
      },
    })
  }

  return (
    <tr className='uppercase text-sm'>
      <td className='font-semibold'>{currentAttribute.attributeTextShort}</td>
      <td className='font-bold w-28 px-4'>
        {bpLookupRecord[currentAttribute.bpVarKey]} of {currentAttribute.maxAllowed}
      </td>
      <td className='flex gap-2'>
        <div
          className={classnames({
            'w-6': true,
            'cursor-not-allowed': !canIncrement,
            'cursor-pointer': canIncrement,
          })}
        >
          <Increment onClick={() => handleAllotBp(INCREASE)} disabled={!canIncrement} />
        </div>
        <div
          className={classnames({
            'w-6': true,
            'cursor-not-allowed': !canDecrement,
            'cursor-pointer': canDecrement,
          })}
        >
          <Decrement onClick={() => handleAllotBp(DECREASE)} disabled={!canDecrement} />
        </div>
      </td>
    </tr>
  )
}
