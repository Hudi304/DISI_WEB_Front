import "./add-donation-center-dialog.scss";
import { MapForm } from "./donation-center-map/map-component";

export const AddDonationCenterDialog = () => {
  return (
    <div className="add-donation-center-container">
      <div className="add-center-title">ADD Donation Center</div>
      <div className="add-center-body ">
        <MapForm />
      </div>
    </div>
  );
};
