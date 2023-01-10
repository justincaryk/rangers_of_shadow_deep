import PageHeader from '../../../../components/page-header'
import SigninForm from '../../../../components/auth/signin-form'

export default function Signin() {
  return (
    <div>
      <PageHeader content={'Sign in'} />
      <SigninForm />
    </div>
  )
}
