import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { Grid } from "components/grid/grid";
import { Icon, ICONS } from "components/icon/icon";
import { useModal } from "context/modal-context";
import { AddDonationCenterDialog } from "./add-donation-cennter-dialog/add-donation-center-dialog";
import { DONATION_CENTER_MOCK_DATA } from "./admin-donation-center-utils";
import { getAdminTableColumns } from "./admin-dontation-centers-constants";

export const AdminDonationCenters = () => {
  const { setModal } = useModal();

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
          <Grid columns={getAdminTableColumns(setModal)} data={DONATION_CENTER_MOCK_DATA} pageSize={500} height={"100%"} itemHeight={48} />
        </Card>
      </div>
    </div>
  );
};
