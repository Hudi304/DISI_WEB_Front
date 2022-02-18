import { FC, useState } from "react"
import "./confirmation-modal.scss"
import { Header } from "components/header/header"
import { Button } from "components/button/button"
import { useModal } from "context/modal-context"

type Props = {
  title: string,
  description?: string,
  children?: React.ReactNode,
  className?: string,
  confirmLabel?: string,
  onConfirm: () => any,
}

export const ConfirmationModal: FC<Props> = ({
  title,
  description,
  children,
  className = '',
  confirmLabel = 'Confirm',
  onConfirm,
}: Props) => {
  const { unSetModal } = useModal()
  const [loading, setLoading] = useState(false)

  return (
    <div className={`confirmation-modal ${className}`}>
      <Header title={title} description={description} />
      {children}
      <div className="flex justify-between mt-7">
        <Button variant="outline" onClick={unSetModal}>Cancel</Button>
        <Button loading={loading}
          onClick={() => {
            setLoading(true)
            Promise.all([onConfirm()]).then(() => {
              setLoading(false)
              unSetModal()
            })
          }}>{confirmLabel}</Button>
      </div>
    </div>
  )
}
