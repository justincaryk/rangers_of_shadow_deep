'use client'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { AuthFormFields } from './types'

const SigninSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

export default function SigninForm() {
  const handleSubmit = (values: AuthFormFields) => {
    console.log(values)
  }
  return (
    <div>
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
              <label
                className='block text-center hidden'
                htmlFor='username'
                aria-label='username'
              >
                Enter username
              </label>
              <Field
                name='username'
                value=''
                placeholder='bob_ross'
                className='w-full border rounded text-xl p-2 text-center'
              />
            </div>

            <div>
              <label
                className='block text-center hidden'
                htmlFor='password'
                aria-label='password'
              >
                Enter Password
              </label>
              <Field
                name='password'
                type='password'
                value=''
                placeholder='Password'
                className='w-full border rounded text-xl p-2 text-center'
              />
            </div>

            <button
              className='w-full border rounded p-3 bg-indigo-600 text-white font-bold'
              type='submit'
            >
              SIGN IN
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
