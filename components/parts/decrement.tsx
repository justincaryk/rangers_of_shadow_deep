import { MinusIcon } from '@heroicons/react/24/outline'
import classnames from 'classnames'

interface Props {
  onClick: () => void
  disabled?: boolean
}
export default function Decrement({ onClick, disabled }: Props) {
  return (
    <div
      onClick={onClick}
      className={classnames({
        'border rounded text-white': true,
        'bg-slate-300': disabled,
        'bg-dirty-orange': !disabled,
      })}
    >
      <MinusIcon />
    </div>
  )
}
