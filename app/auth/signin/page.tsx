'use client'

import PageHeader from '../../../components/page-header'
import SigninForm from '../../../components/auth/sigin-form'

export default function Signin() {
  return (
    <div>
      <PageHeader content={'Sign in'} />
      <SigninForm />
    </div>
  )
}
