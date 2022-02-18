import { FC } from "react"
import "./loader.scss"

type Props = {
  className?: string;
  size?: number;
}

export const Loader: FC<Props> = ({
  className = "",
  size = 10,
}: Props) => {
  return <div className={`${className} relative w-${size} h-${size} flex items-center justify-center animate-pulse`}>
    <svg className="loading" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <circle cx="50" cy="50" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138" transform="rotate(354.844 50 50)">
        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
      </circle>
    </svg>
  </div>
}
