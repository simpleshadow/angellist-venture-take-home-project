import { FC } from 'react'

type RoundedContainerProps = {
  className?: string
}

const RoundedContainer: FC<RoundedContainerProps> = ({ className, children }) => (
  <div className={`bg-white rounded-2xl py-6 px-6 ${className || ''}`}>{children}</div>
)

export default RoundedContainer
