import { useState } from "react";
import "./doctor.scss";

export const Doctor = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  return (
    <div className="flex items-center justify-center ">
      <div className="my-profile-page-container-without-grid-template ">
        <div className="my-profile-side-bar debug">
          <div className="grid grid-rows-12">
            <form className="px-10">
              <br />
              <label className="px-2 text-headline font-bold">Donor Name *</label>
              <br />
              <input
                name="donor-name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <br />
              <br />
              <label className="px-2 text-headline font-bold">Center Name *</label>
              <br />
              <input
                name="center-name"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <br />
              <br />
              <label className="px-2 text-headline font-bold">Request ID</label>
              <br />
              <input
                name="center-name"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <br />
              <br />
              <div className="flex items-center justify-center">
                <input className="mt-5 px-3" type="submit" value="Confirm Donation" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
