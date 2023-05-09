'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { AUTH_TOKEN } from './types'

import { useAuthApi } from './auth-api'
import { parseJwt } from '../utils'
import { useAtom } from 'jotai'
import { useCurrentUser, useSetCurrentUser } from './atoms/current-user'
import { PRIVATE_LINK_ROUTES } from '../nav/routes'
import { SigninInput } from '../../graphql/generated/graphql'

const SigninSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export default function SigninForm() {
  const router = useRouter()

  const [ signinError, setSigninError ] = useState(false)
  const { mutate: signin, data, status } = useAuthApi().signIn

  const [ _, setCurrentUser ] = useAtom(useSetCurrentUser)
  const [ currentUser ] = useAtom(useCurrentUser)

  // sign in success
  useEffect(() => {
    if (status === 'success') {
      if (data.signin?.jwtToken && !currentUser?.userId) {
        localStorage.setItem(AUTH_TOKEN, data.signin.jwtToken)
        const parsed = parseJwt(data.signin.jwtToken)

        setCurrentUser({
          userId: parsed.user_id,
          username: parsed.username,
          jwt: data.signin?.jwtToken,
        })

        router.push(PRIVATE_LINK_ROUTES.DASHBOARD)
      }
    }
  }, [ router, status, data, currentUser, setCurrentUser ])

  // failed
  useEffect(() => {
    if (status === 'success' && !data.signin?.jwtToken) {
      setSigninError(true)
      return
    }
  }, [ status, data, setSigninError ])

  const handleSubmit = async (values: SigninInput) => {
    await signin(values)
  }

  return (
    <div>
      {signinError ? <div className='text-red-400 font-bold'>Incorrect username or password</div> : null}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className='space-y-4 relative pt-6'>
            <div>
              <label className='text-center hidden' htmlFor='username' aria-label='username'>
                Enter username
              </label>
              <Field name='username' placeholder='Aragorn' className='w-full border rounded text-xl p-2 text-center' />
            </div>

            <div>
              <label className='text-center hidden' htmlFor='password' aria-label='password'>
                Enter Password
              </label>
              <Field
                name='password'
                type='password'
                placeholder='Password'
                className='w-full border rounded text-xl p-2 text-center'
              />
            </div>

            <button className='w-full border rounded p-3 bg-indigo-600 text-white font-bold' type='submit'>
              SIGN IN
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
