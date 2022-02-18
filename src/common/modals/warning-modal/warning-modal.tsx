import { FC } from "react"
import "./warning-modal.scss"

import { Header } from "components/header/header"

type Props = {}

export const WarningModal: FC<Props> = (props: Props) => {
  return (
    <div className="warning-modal">
      <Header title="Warning Modal" />
      <div className="warning-modal"></div>
    </div>
  )
}
