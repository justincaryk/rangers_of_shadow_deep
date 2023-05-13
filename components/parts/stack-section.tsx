import classnames from 'classnames'
import { sectionBaseStyles } from './styles'

export default function StackSection({ children }: { children: React.ReactNode }) {
  return <div className={classnames(sectionBaseStyles)}>{children}</div>
}
