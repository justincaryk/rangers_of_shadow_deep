'use client'

import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_TEXT_STYLE } from '../utils'
import { PRIVATE_LINK_ROUTES, PUBLIC_LINK_ROUTES } from './routes'
import { AUTH_TOKEN } from '../auth/types'

export const PRIVATE_LINKS = [
  {
    link: PRIVATE_LINK_ROUTES.DASHBOARD,
    text: 'Dashboard',
    hasNav: false,
    home: true,
  },
  {
    link: PRIVATE_LINK_ROUTES.CREATE_RANGER,
    text: 'Ranger',
    hasNav: false,
  },
  {
    link: PRIVATE_LINK_ROUTES.CREATE_COMPANIONS,
    text: 'Companions',
    hasNav: true,
  },
]

export default function PrivateNavigation() {
  const signout = () => {
    localStorage.setItem(AUTH_TOKEN, '')
    window.location.href = PUBLIC_LINK_ROUTES.SIGN_IN
  }

  return (
    <div className='w-full bg-stone px-6 py-2 relative'>
      <Popover className='relative'>
        <div className=''>
          <div className='flex items-center justify-between md:justify-start md:space-x-10'>
            <div className='flex justify-start lg:w-0 lg:flex-1'>
              <span className='sr-only'>Rangers of Shadow Deep Companion App</span>
              {PRIVATE_LINKS.filter(x => x.home).map(x => (
                <Link href={x.link} key={x.text}>
                  <Image
                    width={200}
                    height={100}
                    // className='h-8 w-auto sm:h-10'
                    src='/images/logo-lg.png'
                    alt=''
                  />
                </Link>
              ))}
            </div>
            <div className='-my-2 -mr-2 md:hidden'>
              <Popover.Button className='inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
            </div>
            <Popover.Group as='nav' className='hidden space-x-10 md:flex'>
              {PRIVATE_LINKS.filter(x => x.hasNav).map(x => (
                <Link href={x.link} key={x.text} className={NAV_TEXT_STYLE}>
                  {x.text}
                </Link>
              ))}
              <Link href='#' className={NAV_TEXT_STYLE} onClick={signout}>
                Signout
              </Link>
            </Popover.Group>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel focus className='absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden'>
            <div className='divide-y-2 divide-gray-50 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Image
                      width={100}
                      height={100}
                      src='/images/logo-lg.png'
                      alt='Rangers of Shadow Deep Companion App'
                    />
                  </div>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
