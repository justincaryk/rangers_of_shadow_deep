import { PlusIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'

interface Props {
  onClick: () => void
  disabled?: boolean
}
export default function Increment({ onClick, disabled }: Props) {
  return (
    <div
      onClick={onClick}
      className={classNames({
        'border rounded': true,
        'border-gray-400 text-gray-400': disabled,
        'border-blue-400 text-blue-400': !disabled,
      })}
    >
      <PlusIcon />
    </div>
  )
}
