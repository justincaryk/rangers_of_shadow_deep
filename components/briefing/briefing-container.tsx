'use client'

import { useState } from 'react'
import classnames from 'classnames'
import PlayerCount from './player-count'
import RangerSelect from './ranger-select'

const baseCarouselItemOuterStyle =
  'cursor-pointer duration-700 ease-in-out flex-grow m-2 min-h-14 min-w-14 pane relative rounded-2xl transition-all'
const baseCarouselItemInnerStyle =
  'absolute background bg-center bg-cover bg-no-repeat duration-700 ease-in-out inset-0 scale-105 transition-all z-10 rounded-2xl h-72'

const baseTransitionStyles = 'delay-100 duration-700 ease-in-out transform transition-all'

const carouselItems = [
  {
    id: 'players',
    subtext: '. choose player count',
    bg: 'bg-green-1',
    Component: PlayerCount,
  },
  {
    id: 'ranger',
    subtext: '. choose your hero',
    bg: 'bg-green-2',
    Component: RangerSelect,
  },
  {
    id: 'companions',
    subtext: '. recruit your friends',
    bg: 'bg-green-3',
  },
  {
    id: 'equipment',
    subtext: '. confirm equipment',
    bg: 'bg-blue-1',
  },
  {
    id: 'enemies',
    subtext: '. add enemies for xp tracking',
    bg: 'bg-red-1',
  },
  {
    id: 'EMBARK',
    subtext: 'run when you have to, fight when you must, rest when you can.',
    bg: 'bg-red-2',
  },
]

export default function BriefingContainer() {
  const [ activeIndex, setActiveIndex ] = useState(carouselItems[0].id)

  return (
    <div className='flex flex-col flex-grow items-stretch min-w-md w-full sm:flex-row h-80 sm:overflow-hidden'>
      {carouselItems.map(ci => (
        <div
          key={ci.id}
          className={classnames({
            [baseCarouselItemOuterStyle]: true,
            active: activeIndex === ci.id,
          })}
          onClick={() => {
            if (ci.id !== activeIndex) {
              setActiveIndex(ci.id)
            }
          }}
        >
          <div
            className={classnames({
              [baseCarouselItemInnerStyle]: true,
              'cursor-default mx-4': activeIndex === ci.id,
              [ci.bg]: true,
            })}
          >
            <div className='p-8 flex flex-col h-full'>
              {activeIndex === ci.id && ci.Component ? <ci.Component /> : null}
              {/* <div className='absolute bg-gradient-to-b bottom-0 duration-700 ease-in-out from-transparent inset-x-0 opacity-0 shadow to-black transform transition-all z-20 h-1/2 translate-y-1/2'></div> */}
              <div className='duration-700 ease-in-out transition-all flex label h-12 max-h-12'>
                {/* <div className='bg-gray-900 flex h-10 icon items-center justify-center mr-3 rounded-full text-red-500 w-10'>
                    <i className='fas fa-walking'></i>
                </div> */}
                <div className='content flex flex-col justify-center leading-tight text-white whitespace-pre'>
                  <div
                    className={classnames({
                      [baseTransitionStyles]: true,
                      'font-bold relative capitalize': true,
                      'opacity-0': activeIndex !== ci.id,
                    })}
                  >
                    {ci.id}
                  </div>
                  <div
                    className={classnames({
                      [baseTransitionStyles]: true,
                      'relative ': true,
                      'opacity-0': activeIndex !== ci.id,
                    })}
                  >
                    {ci.subtext}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
