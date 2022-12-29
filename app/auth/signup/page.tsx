'use client'

import SignupForm from '../../../components/auth/signup-form'
import PageHeader from '../../../components/page-header'

export default function Signup() {
  return (
    <div>
      <PageHeader content='Signup' />
      <SignupForm />
    </div>
  )
}

{
  /* {signUpSuccessful ? (
        <div className='space-y-4 relative w-1/2 m-auto m-0 pt-12 text-xl text-center font-bold'>
          Sign up successful!
        </div>
      ) : ( */
}
