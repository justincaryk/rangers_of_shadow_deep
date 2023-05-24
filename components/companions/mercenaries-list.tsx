'use client'

import MercenaryCard, { MercenaryProps } from './mercenary-card'
import { useCompanionsApi } from './companions-api'
import { Mercenary } from './types'

type Mercenaries = Omit<MercenaryProps, 'mercenary'>

export default function MercenariesList(props: Mercenaries) {
  const { data: mercs } = useCompanionsApi().getMercenaries

  return (
    <div className='space-y-4'>
      {mercs?.allMercenaries?.nodes.map(merc => (
        <MercenaryCard key={merc.id} mercenary={merc} {...props} />
      ))}
    </div>
  )
}
