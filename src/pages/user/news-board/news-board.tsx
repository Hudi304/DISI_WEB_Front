import { Card } from "components/card/card";
import { Grid } from "components/grid/grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store";
import { formatDateFromString } from "utils";
import "./news-board.scss";

const tableColumns = [
  {
    label: "created",
    accessor: "index",
    width: "100px",
    render: (row: any) => <div>{formatDateFromString(row.created)}</div>,
  },
  {
    label: "title",
    accessor: "index",
    width: "200px",
    render: (row: any) => <div>{row.title}</div>,
  },
  {
    label: "description",
    accessor: "index",
    width: "",
    render: (row: any) => <div>{row.description}</div>,
  },
];

export const NewsBoard = () => {
  const [newsFeedArray, setNewsFeedArray] = useState([]);
  const getNewsFeed = useDispatch<RootDispatch>().user.getNewsFeed;
  const newsFeed = useSelector((state: RootState) => state.user.news);

  useEffect(() => {
    getNewsFeed();
  }, []);

  useEffect(() => {
    setNewsFeedArray(newsFeed);
  }, [newsFeed]);

  return (
    <div className="news-board-page-container debug">
      <div className="mx-14 my-10">
        <Card className="user-news-table-card">
          <Grid columns={tableColumns} data={newsFeedArray} pageSize={500} height={"calc"} itemHeight={48} />
        </Card>
      </div>
    </div>
  );
};
