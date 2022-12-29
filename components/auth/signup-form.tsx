'use client'

import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { AuthFormFields } from './types'
import { useSignup } from './use-signup-query'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string().required('Required'),
})

export default function SignupForm() {
  const { mutate: signup } = useSignup()

  const handleSubmit = async (data: AuthFormFields) => {
    await signup(data)
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          console.log('values: ', values)
          handleSubmit(values)
        }}
      >
        {({ errors, touched }) => (
          <Form className='space-y-4 relative pt-6'>
            <div>
              <label
                className='block text-center hidden'
                htmlFor='username'
                aria-label='choose a username'
              >
                Choose a Username
              </label>
              <Field
                name='username'
                placeholder='bob_ross | bob@rosstheboss.com'
                className='w-full border rounded text-xl p-2 text-center'
              />

              {errors.username && touched.username ? (
                <div>{errors.username}</div>
              ) : null}
            </div>

            <div>
              <label
                className='block text-center hidden'
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

{
  /* {signUpSuccessful ? (
        <div className='space-y-4 relative w-1/2 m-auto m-0 pt-12 text-xl text-center font-bold'>
          Sign up successful!
        </div>
      ) : ( */
}
