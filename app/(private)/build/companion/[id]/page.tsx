// import Card from '../../../../../components/parts/card'
// import Dropdown from '../../../../../components/parts/dropdown'
import StackSection from '../../../../../components/parts/stack-section'
import MinorHeader from '../../../../../components/parts/minor-header'
// import CompanionsList from '../../../../../components/companions/mercenaries'
// import SelectedCompanions from '../../../../../components/companions/companions-selected'

// import { useRecruitmentPointsBp } from '../../../../../components/ranger/atoms/build-points'
// import {
//   useAdjustedRecruitmentPoints,
//   useSpentRecruitmentPoints,
// } from '../../../../../components/companions/atoms/recruitment-points'
// import { useUpdatePlayerCount } from '../../../../../components/companions/atoms/players'
// import { useCompanions } from '../../../../../components/companions/atoms/companions'

// import { PLAYER_COUNT } from '../../../../../components/types'
// import { getAdjustedRecruitmentPoints, objectKeys } from '../../../../../components/utils'

// import { BASE_RECRUITMENT_POINTS, RECRUITMENT_POINTS_PER_BP } from '../../../../../components/rules/creation-rules'
import FriendCore from '../../../../../components/companions/friend-core'
import MercTypeSelect from '../../../../../components/companions/merc-type-select'
import FriendBonusSkill from '../../../../../components/companions/friend-bonus-skill'
import FriendBonusSpell from '../../../../../components/companions/friend-bonus-spell'
import FriendBonusItem from '../../../../../components/companions/friend-bonus-item'
import FriendPickContainer from '../../../../../components/companions/friend-pick-container'

export default function Friend() {
  // const [ bpSpentOnRp ] = useAtom(useRecruitmentPointsBp)

  // const [ spentRp ] = useAtom(useSpentRecruitmentPoints)
  // const [ adjustedTotalRp, setAdjustedTotalBp ] = useAtom(useAdjustedRecruitmentPoints)

  // const resetSpent = useResetAtom(useSpentRecruitmentPoints)
  // const resetAdjusted = useResetAtom(useAdjustedRecruitmentPoints)
  // const resetCompanions = useResetAtom(useCompanions)

  // const resetViewState = useCallback(() => {
  //   resetSpent()
  //   resetAdjusted()
  //   resetCompanions()
  // }, [ resetSpent, resetAdjusted, resetCompanions ])

  // const [ players, updatePlayers ] = useAtom(useUpdatePlayerCount)

  // const updateAdjustedRecruitmentPoints = useCallback(() => {
  //   const bonusRp = bpSpentOnRp * RECRUITMENT_POINTS_PER_BP
  //   const total = getAdjustedRecruitmentPoints(players, bonusRp + BASE_RECRUITMENT_POINTS)
  //   setAdjustedTotalBp(total)
  // }, [ bpSpentOnRp, players, setAdjustedTotalBp ])

  // useEffect(() => {
  //   updateAdjustedRecruitmentPoints()
  // }, [ players, bpSpentOnRp, updateAdjustedRecruitmentPoints ])

  // const playerOptions = useMemo(() => {
  //   let counter = 0
  //   return objectKeys(PLAYER_COUNT).map(x => {
  //     counter++
  //     return {
  //       value: PLAYER_COUNT[x],
  //       text: counter,
  //     }
  //   })
  // }, [])

  // const spendBuildPoint = async () => {
  //   if (bpSpentOnRp > 0) {
  //     // await updateBpSpentOnRp(INCREASE)
  //   }
  // }
  // const recoverBuildPoint = () => {
  //   if (bpSpentOnRp > 0) {
  //     // updateBpSpentOnRp(DECREASE)
  //   }
  // }

  // const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   resetViewState()
  //   updatePlayers(e.currentTarget.value as PLAYER_COUNT)
  // }

  return (
    <div className='space-y-6 w-full'>
      <MinorHeader content='companion' />
      {/* NEW / SELECTED COMPANION CONTAINER */}
      {/* 
        FORM FIELDS: 
          NAME
          BONUS SKILL
          PROGRESSION POINTS
      */}
      <StackSection>
        <FriendCore />
      </StackSection>
      {/* 
        COMPANION CARD
          INCLUDE STAT OVERRIDE AND RENDER CURRENT PP
      */}

      {/* 
        CREATE A NEW PAGE WHERE YOU CAN SET A RANGER FOR PLAY
        AND MOVE THIS THERE
       */}
      {/* <Card
        header={null}
        main={
          <div className='space-y-4'>
            <div>
              <div className='flex flex-row items-center gap-x-4 w-full'>
                <div className='font-bold uppercase whitespace-nowrap'>Number of Players:</div>
                <Dropdown className='w-32' options={playerOptions} value={players} onChange={handlePlayerChange} />
              </div>
              <div className='text-sm italic'>
                Warning! Changing the number of players will remove any selected companions and reset your recruitment
                points.
              </div>
            </div>
            <div className='font-bold uppercase'>Total Recruitment Points: {adjustedTotalRp}</div>
            <div className='font-bold uppercase'>Remaining Recruitment Points: {adjustedTotalRp - spentRp}</div>
          </div>
        }
      />
      */}

      <StackSection>
        <MercTypeSelect />
      </StackSection>

      <StackSection>
        <FriendBonusSkill />
      </StackSection>

      <FriendPickContainer />
    </div>
  )
}
