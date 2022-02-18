import { FC } from "react"
import { Column } from "../grid"
import { GridRow } from "./grid-row"

type Props = {
  columns: Column[],
  data: any[],
  itemHeight: number
  totalItems: number
  onRowClick?: (row: any) => void
}

export const GridBody: FC<Props> = ({
  columns,
  data,
  itemHeight,
  totalItems,
  onRowClick,
}: Props) => {
  return <div
    className="grid-body"
    style={{ height: itemHeight * totalItems }}>
    {
      data.map((row: any) =>
        <GridRow
          key={row.id}
          row={row}
          columns={columns}
          itemHeight={itemHeight}
          onClick={onRowClick}
        />
      )
    }
  </div>
}
