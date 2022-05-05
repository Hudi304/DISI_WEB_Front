import { Card } from "components/card/card";
import { Checkbox } from "components/form-components/checkbox/checkbox";
import { Grid } from "components/grid/grid";

const tableColumns = [
  {
    label: () => (
      <Checkbox
        value={false}
        onChange={(event: any) => {
          // console.log("select all");
        }}
      />
    ),
    accessor: "index",
    width: "50px",
    render: (row: any) => (
      <Checkbox
        value={false}
        onChange={(event: any) => {
          // console.log("select");
        }}
      />
    ),
  },
  {
    label: "nrCrt",
    accessor: "index",
    width: "50px",
    render: (row: any) => <div>{row.id}</div>,
  },
  {
    label: "name",
    accessor: "index",
    width: "200px",
    render: (row: any) => <div>{row.name}</div>,
  },
];

const data = [{ id: 1, name: "Gheorghe" }];

export const AdminUsers = () => (
  <div className="admin-page">
    <div className="users-table-container">
      <Card>
        <Grid columns={tableColumns} data={data} pageSize={500} itemHeight={48} />
      </Card>
    </div>
  </div>
);
