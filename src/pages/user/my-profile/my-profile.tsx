import { useState } from "react";
import "./my-profile.scss";

const BLOOD_TYPES = [
  {
    value: "A+",
    label: "A-",
  },
  {
    value: "B+",
    label: "B-",
  },
  {
    value: "O+",
    label: "O-",
  },
  {
    value: "AB+",
    label: "AB-",
  },
];

type UserProfileParameterProps = {
  title: string;
  value?: number;
  max?: number;
  min?: number;
};

export const UserProfileParameter = ({ title, value }: UserProfileParameterProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="user-profile-parameter debug">
        <div className="title">{title}</div>

        <div className="loading-bar-container debug ">
          <div className="loading-bar" style={{ width: `${value}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export const MyProfile = () => {
  const [cnp, setCnp] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="my-profile-page-container">
      <div className="my-profile-side-bar debug">
        <div className="grid grid-rows-2 p-4">
          <label>First Name</label>
          <input
            className="rounded-md"
            name="firstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-rows-2 p-4">
          <label>Last Name</label>
          <input
            className="rounded-md"
            name="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-rows-2 p-4">
          <label>CNP</label>
          <input
            className="rounded-md"
            name="CNP"
            value={cnp}
            onChange={(e) => {
              setCnp(e.target.value);
            }}
          />
        </div>

        <div className="grid grid-rows-2 p-4">
          <label>Weight</label>
          <input
            className="rounded-md"
            name="weight"
            value={weight}
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
        </div>

        <select
          name="cars"
          id="cars"
          onChange={(e) => {
            console.log(e.target.value);
          }}
        >
          {BLOOD_TYPES.map((type, index) => {
            return <option value={type.value}>{type.label}</option>;
          })}
        </select>
      </div>
      <div className="flex items-center justify-start pl-7">
        <div className="my-profile-page debug">
          <UserProfileParameter title={"Weight"} value={50} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={30} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={10} max={100} min={0} />

          <UserProfileParameter title={"Weight"} value={90} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={50} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={80} max={100} min={0} />

          <UserProfileParameter title={"Weight"} value={45} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={15} max={100} min={0} />
          <UserProfileParameter title={"Weight"} value={95} max={100} min={0} />
        </div>
      </div>
    </div>
  );
};
