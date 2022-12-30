import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface Props {
  isShow: boolean
  onClick: () => void
}
export default function ShowHide({ isShow, onClick }: Props) {
  return <div onClick={onClick}>{isShow ? <EyeSlashIcon /> : <EyeIcon />}</div>
}
