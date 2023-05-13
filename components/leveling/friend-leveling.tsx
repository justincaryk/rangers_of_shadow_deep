'use client'

import { Field, Form, Formik } from 'formik'
import { useMemo } from 'react'
import * as Yup from 'yup'

import Card from '../parts/card'
import { baseInputClasses } from '../parts/input'
import SmallButton from '../parts/small-button'
import Loader from '../loader'

import { useLevelingApi } from './leveling-api'
import { useCompanionsApi } from '../companions/companions-api'

import { FriendPatch, Friend } from '../../graphql/generated/graphql'
import { FriendLevelGrantFlat } from './types'

export const FriendLevelingFieldsSchema = Yup.object().shape({
  progressionPoints: Yup.number().required('Required'),
})

interface LevelUpCardProps {
  friend: Friend
}

const LevelUpCardContent = ({ friend }: LevelUpCardProps) => {
  const { mutate: mutateFriend } = useCompanionsApi().updateFriend
  const { data: rules } = useLevelingApi().friendRules
  const { mutate: createLevelRef } = useLevelingApi().createLevelRef
  const { mutate: updateLevelRef } = useLevelingApi().updateLevelRef

  const handleSubmit = (data: FriendPatch) => {
    mutateFriend({
      id: friend.id,
      patch: {
        progressionPoints: FriendLevelingFieldsSchema.fields.progressionPoints.cast(data.progressionPoints),
      },
    })
  }

  // upgrades with duplicate benefits have been combined and need to be unpacked for rendering
  const rulesUnwound = useMemo(() => {
    if (!rules?.allFriendLevelGrants?.nodes.length) {
      return []
    }

    const sorted = rules?.allFriendLevelGrants?.nodes.sort((a, b) => {
      if (a.ppMilestoneFirst > b.ppMilestoneFirst) {
        return 1
      } else if (a.ppMilestoneFirst < b.ppMilestoneFirst) {
        return -1
      }
      return 0
    })

    return [ ...sorted, ...sorted.filter(x => x.ppMilestoneSecond) ]
  }, [ rules ]) as FriendLevelGrantFlat[]

  //   const tryBuyLevel = () => {
  //     const nextLevel = (friend.level || 0) + 1
  //     const levelCost = determineApplicableRangerLevelUpCost(nextLevel, rules?.levelCosts?.nodes ?? [])
  //     const levelGrant = determineApplicableRangerLevelUpBenefit(nextLevel, rules?.levelGrants?.nodes ?? [])

  //     if (!levelCost || !levelGrant) {
  //       console.error('couldnt find a matching level grant item or cost', {
  //         levelCost,
  //         levelGrant,
  //       })
  //       throw new Error('couldnt find a matching level grant item or cost')
  //     }

  //     // can they afford it
  //     if (friend.xp > levelCost.cost) {
  //       // is this the first time the feature is granted? -> create
  //       if (friend.level > 4) {
  //         createLevelRef({
  //           characterId: friend.id,
  //           levelGrantId: levelGrant.id,
  //         })
  //       }
  //       // update instead
  //       else {
  //         const levelRef = friend.memberLevelsByCharacterId.nodes.find(x => x.levelGrantId === levelGrant.id)

  //         if (!levelRef) {
  //           console.error('cant find a matching level reference')
  //           throw new Error('cant find a matching level reference')
  //         }

  //         updateLevelRef({
  //           id: levelRef.id,
  //           granted: levelRef.granted++,
  //         })
  //       }

  //       // deduct cost from friend xp & increment their level.
  //     }
  //   }

  return (
    <div className='space-y-4'>
      <div className='flex gap-x-4'>
        <div className='font-bold'>Progression Points: {friend.progressionPoints}</div>
      </div>
      <ul className='text-dirty-orange list-disc px-6 text-xs'>
        {rulesUnwound.map((benefit, i) => (
          <li key={benefit.id}>
            <strong className='capitalize'>{i + 1}0</strong> &nbsp;
            {benefit.description}
          </li>
        ))}
      </ul>
      <div className='space-y-1 text-sm text-dirty-orange'>
        <div>
          {/* <Formik
            initialValues={{
              xp: friend.xp ?? 0,
              level: friend.level ?? 0,
            }}
            validationSchema={RangerLevelingFieldsSchema}
            onSubmit={handleSubmit}
          >
            {({ submitForm }) => (
              <Form className='flex gap-x-6 justify-content'>
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Set XP:
                  </label>
                  <Field name='xp' className={`${baseInputClasses}`} onBlur={submitForm} />
                </div>
                <Field name='level' hidden />
                <div className='flex gap-x-2 items-center'>
                  <label className='font-semibold' htmlFor='xp' aria-label='xp'>
                    Buy Level:
                  </label>
                  <SmallButton onClick={tryBuyLevel} type='button'>
                    Level Up
                  </SmallButton>
                </div>
              </Form>
            )}
          </Formik> */}
        </div>
      </div>
    </div>
  )
}

export default function FriendLeveling() {
  const { data: friend } = useCompanionsApi().getFriend

  if (!friend?.friendById) {
    return <Loader />
  }

  return (
    <div>
      <div className='space-y-1'>
        <Card>
          <LevelUpCardContent friend={friend.friendById as Friend} />
        </Card>
      </div>
    </div>
  )
}
