import { FC } from "react"
import "./skeleton.scss"

type Props = {
  className?: string;
  children?: React.ReactNode | React.ReactChild[];
  loading?: boolean;
}

export const Skeleton: FC<Props> = ({
  className = "",
  children,
  loading = true,
}: Props) => {
  return (
    <div className={`skeleton-container ${className} ${loading ? "loading" : ""}`}>
      {children}
    </div>
  )
}
