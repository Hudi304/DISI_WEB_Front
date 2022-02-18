import { useEffect, useMemo, useRef, useState } from "react";
import "./grid.scss";
import throttle from "lodash.throttle";
import { Loader } from "components/loader/loader";
import { GridHeader } from "./grid-header/grid-header";
import { GridBody } from "./grid-body/grid-body";

export type Align = "left" | "center" | "right";

export type Column = {
  accessor?: string;
  label: any;
  width?: number | string;
  minWidth?: number | string;
  render?: (row: any) => any;
  align?: Align;
}

type GridProps = {
  data?: any[];
  loadData?: ({ page, pageSize }: { page: number, pageSize: number }) => Promise<void>;
  pageSize?: number;
  height?: number | string;
  itemHeight?: number;
  className?: string;
  columns: Column[];
  onRowClick?: (row: any) => void;
}

export const Grid = ({
  data = [],
  loadData,
  pageSize = 10,
  height = "100%",
  itemHeight = 45,
  className,
  columns = [],
  onRowClick,
}: GridProps) => {
  const [gridData, setGridData] = useState([]);
  const [page, setPage] = useState(Math.floor(data.length / pageSize));
  const [noMoreItems, setNoMoreItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gridColumns, setGridColumns] = useState([...columns]);
  const gridRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (data && columns) {
      setGridData(data.map((row: any, index: number) => ({ ...row, index })) as any);
      const columnPercentSum = columns.reduce((sum: number, column: Column) => sum + (typeof column.width === 'string' && column.width.endsWith('%') ? Number(column.width.split('%')[0]) : 0), 0);
      setGridColumns(columns.map(column => {
        const { width, minWidth } = column;
        let fraction = '1fr';
        if (typeof width === 'string') {
          if (width.endsWith('%')) {
            let percent = Number(width.split('%')[0]);
            fraction = `minmax(${minWidth || "70px"}, ${percent}fr)`;
          } else if (width.endsWith('px')) {
            fraction = width
          }
        } else if (typeof width === 'number') {
          fraction = width + 'px';
        } else {
          fraction = `minmax(${minWidth || 70}px, ${Math.floor((100 - columnPercentSum) / columns.length)}fr)`;
        }

        return {
          ...column,
          fraction,
        }
      }));
    }
  }, [data, columns, pageSize]);

  const handleScroll = () => {
    setScrollPosition({
      top: gridRef?.current?.scrollTop as number,
      left: gridRef?.current?.scrollLeft as number
    });
  }

  const handleScrollThrottled = useMemo(() => throttle(handleScroll, 100), []);

  useEffect(() => {
    if (gridRef?.current) {
      let ref = gridRef.current;
      ref.addEventListener('scroll', handleScrollThrottled);
      return () => {
        ref.removeEventListener('scroll', handleScrollThrottled);
      }
    }
  }, [gridRef, handleScrollThrottled]);

  useEffect(() => {
    if (loadData && pageSize && !loading && data.length === pageSize * page && !noMoreItems) {
      const fetchData = async () => {
        setLoading(true);
        await loadData({ page: page + 1, pageSize }).then(() =>
          setNoMoreItems(data.length < pageSize)
        )
        setLoading(false);
      }
      fetchData();
    }
  }, [page, pageSize, loadData, loading, data, noMoreItems]);

  useEffect(() => {
    if (gridRef?.current && gridData.length === page * pageSize + pageSize) {
      const { scrollHeight, clientHeight } = gridRef.current;
      const scrollTop = scrollPosition.top;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      if (scrollBottom < itemHeight * pageSize / 2) {
        setPage(page + 1);
      }
    }
  }, [gridRef, gridData, scrollPosition, itemHeight, page, pageSize]);

  const slice = (values: any[]) => {
    const SLICE_OFFSET = 30;
    return values.slice(Math.max(0, scrollPosition.top / itemHeight - SLICE_OFFSET), scrollPosition.top / itemHeight + SLICE_OFFSET)
  };

  return (
    <div ref={gridRef} className={`grid-container ${className}`} style={{ height }}>
      <GridHeader columns={gridColumns} />
      <GridBody
        columns={gridColumns}
        data={slice(gridData)}
        totalItems={gridData.length}
        itemHeight={itemHeight}
        onRowClick={onRowClick}
      />
      {loading && <Loader className="w-full text-primary- mt-2" />}
    </div>
  );
};