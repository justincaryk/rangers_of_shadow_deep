import { Spinner } from './parts/spinner'

export default function Loader() {
  return (
    <div className='text-center text-lg mt-25 mb-25'>
      <Spinner />
      <div>...Loading</div>
    </div>
  )
}
