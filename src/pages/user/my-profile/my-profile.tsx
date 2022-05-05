import { UserProfileDTO } from "common/models/UserProfileDTO";
import { Button } from "components/button/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "store";
import { MyProfileInput, MyProfileSelect } from "./my-profile-input";
import { BLOOD_TYPES, SEXES } from "./my-profile-utils";
import "./my-profile.scss";

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
  const [age, setAge] = useState("");

  const [bloodType, setBloodType] = useState("");
  const [sex, setSex] = useState("");

  const getNewsFeed = useDispatch<RootDispatch>().user.getNewsFeed;
  const getMyProfile = useDispatch<RootDispatch>().user.getMyProfile;
  const updateMyProfile = useDispatch<RootDispatch>().user.updateMyProfile;

  // const userInfo = localStorage.getItem("userInfo");

  const objString = localStorage.getItem("userInfo") || "{}";

  const userInfo = JSON.parse(objString);
  console.log(userInfo);

  const newsFeed = useSelector((state: RootState) => state.user.news);
  const userProfile = useSelector((state: RootState) => state.user.userProfile);

  useEffect(() => {
    getMyProfile(userInfo.id);
  }, []);

  useEffect(() => {
    // console.log("userProfile?.age : ", userProfile?.age);
    setAge(String(userProfile?.age || ""));
  }, [userProfile]);

  function onSave() {
    const newUserProfile = new UserProfileDTO();
    newUserProfile.age = age;
    newUserProfile.cnp = cnp;
    newUserProfile.bloodType = bloodType;
    newUserProfile.sex = sex;
    newUserProfile.weight = weight;
    updateMyProfile({ id: userInfo.id, newUserProfile });
  }

  return (
    <div className="my-profile-page-container">
      <div className="my-profile-side-bar debug">
        <MyProfileInput title="First Name" value={firstName} setValue={setFirstName} />
        <MyProfileInput title="Last Name" value={lastName} setValue={setLastName} />
        <MyProfileInput title="CNP" value={cnp} setValue={setCnp} />
        <MyProfileInput title="Weight" value={weight} setValue={setWeight} />
        <MyProfileInput title="Age" value={age} setValue={setAge} />
        <MyProfileSelect title="Sex" onChange={setSex} options={SEXES} />
        <MyProfileSelect title="Blood Type" onChange={setBloodType} options={BLOOD_TYPES} />
        <Button onClick={onSave}>Save</Button>
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
