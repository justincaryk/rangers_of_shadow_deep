import BriefingContainer from '../../../components/briefing/briefing-container'
import MinorHeader from '../../../components/parts/minor-header'

export default function Briefing() {
  // const updateAdjustedRecruitmentPoints = useCallback(() => {
  //   const bonusRp = bpSpentOnRp * RECRUITMENT_POINTS_PER_BP
  //   const total = getAdjustedRecruitmentPoints(players, bonusRp + BASE_RECRUITMENT_POINTS)
  //   setAdjustedTotalBp(total)
  // }, [ bpSpentOnRp, players, setAdjustedTotalBp ])

  return (
    <div className='space-y-6 w-full'>
      {/* <MinorHeader content='companion' /> */}
      {/* select a ranger from cards */}
      {/* show expanded on load & collapse on select confirm*/}

      {/* then show player select & companion selections */}

      {/* then select number of players */}
      {/* don't hide the dropdown. show the recruitment points and then do adjusted */}
      {/* 
        formula is basically:::
        total ranger recruitmentPoints + base/adjusted for player
        add the leadership skill value to the result above
      */}

      {/* show all companions ranger from cards */}

      <BriefingContainer />
    </div>
  )
}
