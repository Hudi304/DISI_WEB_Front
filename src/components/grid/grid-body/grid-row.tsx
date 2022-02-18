import { memo } from "react";
import "./grid-body.scss";
import moment from "moment";
import { getValue } from "utils";

type GridRowProps = {
  row: any;
  columns: any[];
  itemHeight: number;
  className?: string;
  onClick?: (row: any) => void;
}

export const GridRow = memo(({
  row,
  columns,
  itemHeight,
  className = '',
  onClick,
}: GridRowProps) => {

  const renderValue = (value: any) => {
    if (typeof value === 'string') {
      if (value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
        return moment(value).format('MM/DD/YYYY');
      } else {
        return value;
      }
    } else if (typeof value === 'number') {
      return value.toString();
    } else if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    } else if (value instanceof Date) {
      return moment(value).format();
    } else if (value instanceof Array) {
      return value.join(', ');
    } else if (value instanceof Object) {
      return JSON.stringify(value);
    }
  }



  return (
    <div className={`row ${className} ${onClick ? 'clickable' : ''}`}
      onClick={() => onClick && onClick(row)}
      style={{
        height: itemHeight,
        maxHeight: itemHeight,
        transform: `translateY(${itemHeight * row.index}px)`,
        gridTemplateColumns: columns.map(c => c.fraction).join(' '),
      }}>
      {columns.map((column, columnIndex) => {
        const { accessor, render } = column;

        const value = accessor ? getValue(row, accessor) : '';
        return (
          <div className="cell"
            key={columnIndex}
            style={{
              height: itemHeight,
              maxHeight: itemHeight,
              textAlign: column.align || 'left',
            }}
          >
            <span className={`${className} text-body truncate ...`} title={value?.toString()}>{render ? render(row) : renderValue(value)}</span>
          </div>
        );
      })}
    </div>
  )
});