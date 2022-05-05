import { CreateNewsItemRequest } from "common/models/CreateNewsItemRequest";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { Checkbox } from "components/form-components/checkbox/checkbox";
import { Grid } from "components/grid/grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store";
import { formatDateFromString } from "utils";

import "./admin-newsfeed.scss";

const tableColumns = [
  {
    label: () => (
      <Checkbox
        value={false}
        onChange={(event: any) => {
          console.log("select all");
        }}
      />
    ),
    accessor: "index",
    width: "50px",
    render: (row: any) => (
      <Checkbox
        value={false}
        onChange={(event: any) => {
          console.log("select");
        }}
      />
    ),
  },
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

export const AdminNewsFeed = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const postNews = useDispatch<RootDispatch>().admin.postNews;
  const getNewsFeed = useDispatch<RootDispatch>().admin.getNewsFeed;

  const newsFeed = useSelector((state: RootState) => state.admin.news);

  const [newsFeedArray, setNewsFeedArray] = useState([]);

  function onSubmit() {
    const news: CreateNewsItemRequest = {
      description: text,
      title: title,
    };
    postNews(news);
  }

  useEffect(() => {
    getNewsFeed();
  }, []);

  useEffect(() => {
    console.log(newsFeed);
    setNewsFeedArray(newsFeed);
  }, [newsFeed]);

  return (
    <div className="news-feed-page-container">
      <div className="flex justify-center">
        <div className="form-card">
          <div className="flex m-1">
            <label className="px-2 text-headline font-bold">Title</label>
            <input
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>

          <div className="flex  m-1">
            <label className="px-2 text-headline font-bold">Text</label>
            <textarea
              className="h-52"
              name="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-center  m-1">
            <Button onClick={onSubmit}>Post</Button>
          </div>
        </div>
      </div>

      <div className="">
        <Card className="table-card">
          <Grid
            columns={tableColumns}
            data={newsFeedArray}
            pageSize={500}
            height={"calc"}
            itemHeight={48}
            onRowClick={() => {
              console.log("on row click");
            }}
          />
        </Card>
      </div>
    </div>
  );
};
