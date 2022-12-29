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
        'border rounded': true,
        'text-gray-400 border-gray-400': disabled,
        'text-red-400 border-red-400': !disabled,
      })}
    >
      <MinusIcon />
    </div>
  )
}
