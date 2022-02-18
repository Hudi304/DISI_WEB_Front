import { Button } from "components/button/button"
import { FC } from "react"
import "./header.scss"

type Props = {
  title: string,
  description?: string,
  className?: string,
  actions?: {
    label: string,
    onClick: () => void,
    variant?: string,
    disabled?: boolean,
    props?: any
  }[],
  rightSide?: React.ReactNode
}

export const Header: FC<Props> = ({
  title,
  description,
  className = '',
  actions = [],
  rightSide = null
}: Props) => {
  return <div className={`header ${className}`}>
    <div>
      <div className="header-title">
        {title}
      </div>
      <div className="header-description">
        {description}
      </div>
    </div>
    <div className="header-actions">
      {actions.map(({ label, onClick, props, disabled, variant }) =>
        <Button key={label} variant={variant} disabled={disabled} onClick={onClick} {...props}>{label}</Button>
      )}
    </div>
    {
      rightSide && <div className="header-right-side">
        {rightSide}
      </div>
    }
  </div>
}
