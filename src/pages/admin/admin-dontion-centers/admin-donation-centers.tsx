import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { Checkbox } from "components/form-components/checkbox/checkbox";
import { Grid } from "components/grid/grid";
import { Icon, ICONS } from "components/icon/icon";
import { useModal } from "context/modal-context";
import { AddDonationCenterDialog } from "./add-donation-cennter-dialog/add-donation-center-dialog";
import { DONATION_CENTER_MOCK_DATA, tableColumns } from "./admin-donation-center-utils";
import { EditDonationCenterDialog } from "./edit-donation-center-dialog/edit-donation-center-dialog";

export const AdminDonationCenters = () => {
  const { setModal } = useModal();

  const tableColumns = [
    {
      label: "nrCrt",
      accessor: "index",
      width: "40px",
      render: (row: any) => <div>{row.id}</div>,
    },
    {
      label: "name",
      accessor: "index",
      width: "5vw",
      render: (row: any) => <div>{row.name}</div>,
    },
    {
      label: "latitude",
      accessor: "latitude",
      width: "10vw",
      render: (row: any) => <div>{row?.latitude}</div>,
    },
    {
      label: "longitude",
      accessor: "longitude",
      width: "10vw",
      render: (row: any) => <div>{row?.longitude}</div>,
    },
    {
      label: "city",
      accessor: "city",
      width: "10vw",
      render: (row: any) => <div>{row?.city}</div>,
    },
    {
      label: "",
      accessor: "",
      width: "70px",
      render: (row: any) => {
        return (
          <Button
            onClick={(e: any) => {
              console.log(row);
              setModal(<EditDonationCenterDialog />);
            }}
          >
            <Icon icon={ICONS.PENCIL} />
          </Button>
        );
      },
    },
  ];

  function onAddDonationCenter() {
    setModal(<AddDonationCenterDialog />);
  }

  return (
    <div className="admin-page">
      <div className="w-full flex items-center justify-end p-3">
        <Button onClick={onAddDonationCenter}>
          <Icon icon={ICONS.PLUS_CIRCLE} />
          Add Donation Center
        </Button>
      </div>
      <div className="users-table-container">
        <Card>
          <Grid
            columns={tableColumns}
            data={DONATION_CENTER_MOCK_DATA}
            // loadData={getAuditCatalogData}
            pageSize={500}
            height={"100%"}
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
