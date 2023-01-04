import { PlusIcon } from '@heroicons/react/24/solid'
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
        'border rounded text-white': true,
        'bg-slate-300': disabled,
        'bg-blue-400': !disabled,
      })}
    >
      <PlusIcon />
    </div>
  )
}
