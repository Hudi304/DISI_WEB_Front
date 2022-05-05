import { Button } from "components/button/button";
import { Icon, ICONS } from "components/icon/icon";
import { EditDonationCenterDialog } from "./edit-donation-center-dialog/edit-donation-center-dialog";

export function getAdminTableColumns(setModal: (e: any) => void) {
  return [
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
              setModal(<EditDonationCenterDialog />);
            }}
          >
            <Icon icon={ICONS.PENCIL} />
          </Button>
        );
      },
    },
  ];
}

export interface Option {
  value: any;
  label: string | React.ReactNode;
  disabled?: boolean;
}

export const CityOptions: Option[] = [
  {
    value: "Cluj-Napoca",
    label: "Cluj-Napoca",
    disabled: false,
  },
  {
    value: "Iasi",
    label: "Iasi",
    disabled: false,
  },
  {
    value: "Timisoara",
    label: "Timisoara",
    disabled: false,
  },
  {
    value: "Bucuresti",
    label: "Bucuresti",
    disabled: false,
  },
];
