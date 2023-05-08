'use client'

import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { useRouter } from 'next/navigation'
import { PUBLIC_LINK_ROUTES } from '../nav/routes'
import { useAuthApi } from './auth-api'
import { SignupInput } from '../../graphql/generated/graphql'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Required'),
})

export default function SignupForm() {
  const [ signupError, setSignupError ] = useState<string | null>(null)
  const { mutate: signup, status, data } = useAuthApi().signUp

  const router = useRouter()

  useEffect(() => {
    if (status === 'success') {
      if (!data.signup?.boolean) {
        setSignupError(
          'There was an error signing you up. Try a different username.'
        )
        return
      }

      router.push(PUBLIC_LINK_ROUTES.SIGN_IN)
      return
    }
  }, [ data, setSignupError, status, router ])

  const handleSubmit = async (data: SignupInput) => {
    await signup(data)
  }

  return (
    <div>
      {signupError ? (
        <div className='text-red-400 font-bold'>{signupError}</div>
      ) : null}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
        setErrors={status === 'error'}
      >
        {({ errors, touched }) => (
          <Form className='space-y-4 relative pt-6'>
            <div>
              <label
                className='text-center hidden'
                htmlFor='username'
                aria-label='choose a username'
              >
                Choose a Username
              </label>
              <Field
                name='username'
                placeholder='bob_ross'
                className='w-full border rounded text-xl p-2 text-center'
              />

              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </div>

            <div>
              <label
                className='text-center hidden'
                htmlFor='password'
                aria-label='create a password'
              >
                Create a Password
              </label>
              <Field
                name='password'
                type='password'
                placeholder='Make it good!'
                className='w-full border rounded text-xl p-2 text-center'
              />

              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
            </div>

            <button
              className='w-full border rounded p-3 bg-indigo-600 text-white font-bold'
              type='submit'
            >
              SIGN UP
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
