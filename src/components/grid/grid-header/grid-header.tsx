import { memo } from "react";
import "./grid-header.scss";

type GridHeaderProps = {
  columns: any[];
}

export const GridHeader = memo(({ columns }: GridHeaderProps) => {
  return (
    <div className="grid-header"
      style={{
        gridTemplateColumns: columns.map(c => c.fraction).join(' '),
      }}>
      {columns.map((column, columnIndex) => {
        return (
          <div className="grid-header-column"
            style={{ textAlign: column.align || 'left' }}
            key={columnIndex}>
            {typeof column.label === 'string' ? <span className="text-body">{column.label}</span> : column.label()}
          </div>
        );
      })}
    </div>
  )
});