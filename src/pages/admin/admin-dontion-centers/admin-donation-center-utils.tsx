import { Button } from "components/button/button";
import { Icon, ICONS } from "components/icon/icon";

export const tableColumns = [
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
          }}
        >
          <Icon icon={ICONS.PENCIL} />
        </Button>
      );
    },
  },
];

export const DONATION_CENTER_MOCK_DATA = [
  { id: 1, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 2, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 3, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 4, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 5, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 6, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
  { id: 7, name: "Regina-Maria", latitude: "32131212", longitude: "dsadassa", city: "Cluj-Napoca" },
];
