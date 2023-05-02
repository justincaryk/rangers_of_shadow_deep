import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface Props {
  isShow: boolean
  onClick: () => void
}
export default function ShowHide({ isShow, onClick }: Props) {
  return isShow ? <EyeSlashIcon onClick={onClick} /> : <EyeIcon onClick={onClick} />
}
