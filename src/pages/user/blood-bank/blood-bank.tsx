import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button/button";
import { Card } from "components/card/card";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import "./blood-bank.scss";
import * as yup from "yup";
import { RootDispatch, RootState } from "store";
import { connect } from "react-redux";
import { MyProfileSelect } from "../my-profile/my-profile-input";
import { BLOOD_TYPES } from "../my-profile/my-profile-utils";
import { BloodBankRequestDTO } from "common/models/BloodBankRequestDTO";
import user from "store/user";
import { ACCESS_TOKEN } from "api/api";
import axios from "axios";
import { Input } from "components/form-components/input/input";

const schema = yup.object({});

const LOCATIONS = [
  {
    value: "Cluj-Napoca",
    label: "Cluj-Napoca",
  },
  {
    value: "Bucuresti",
    label: "Bucuresti",
  },
  {
    value: "Bacau",
    label: "Bacau",
  },
];

const BLOOD_TYPES_REQUEST = [
  {
    value: "Ap",
    label: "A+",
  },
  {
    value: "An",
    label: "A-",
  },
  {
    value: "Bp",
    label: "B+",
  },
  {
    value: "Bn",
    label: "B-",
  },
  {
    value: "Op",
    label: "O+",
  },

  {
    value: "On",
    label: "O-",
  },
  {
    value: "ABp",
    label: "AB+",
  },
  {
    value: "ABn",
    label: "AB-",
  },
];

interface BloodBankRequestInterface {
  id: string;
  requestorName: string;
  city: string;
  bloodType: string;
  active: boolean;
}

const headers = {
  "Content-Type": "application/json",
  Authorization: localStorage.getItem(ACCESS_TOKEN),
};

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

var listOfReqeustDefault: BloodBankRequestInterface[] = [];

export const BloodBankComponent: FC<Props> = ({ getBloodBankRequestsCall, reqBloodBankResponse, postBloodRequestReq }: Props) => {
  const [listOfRequest, setListOfRequest] = useState(listOfReqeustDefault);
  const [bloodType, setBloodType] = useState("");
  const [location, setLocation] = useState("");
  const [showRequest, setShowRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  useEffect(() => {
    getBloodBankRequestsCall();
  }, []);

  useEffect(() => {
    // setListOfRequest(reqBloodBankResponse);
    var listElements: BloodBankRequestInterface[] = [];
    if (Array.isArray(reqBloodBankResponse)) {
      reqBloodBankResponse.forEach((element: any) => {
        var tempElement: BloodBankRequestInterface = {
          id: element.id,
          requestorName: element.requestorName,
          city: element.city,
          bloodType: element.bloodType,
          active: element.active,
        };
        listElements.push(tempElement);
      });
      setListOfRequest(listElements);
      if (listOfRequest.length > 0) {
        setShowRequest(true);
      }
    }
  }, [reqBloodBankResponse]);

  function handleSubmitBloodBank(values: any) {
    const mail = localStorage.getItem("emailUser");

    if (bloodType === "" || location === "" || values?.name === ""){
      setErrorMessage(true)
    }
    else{
      setErrorMessage(false)
    }
    if (!errorMessage){
      var requestBody: BloodBankRequestDTO = {
        userEmail: mail ?? "",
        userName: values?.name,
        city: location,
        bloodType: bloodType,
      };
      // console.log("REQUEST BODY", requestBody);
      postBloodRequestReq(requestBody);
      getBloodBankRequestsCall();
    }
  }

  return (
    <div className="blood-request-page-container">
      <Card>
        {errorMessage && <div className="error-message">ERROR! You need to select the city and blood type and write the name!</div>}
        <FormProvider {...methods}>
          <form className="sign-up-form" onSubmit={methods.handleSubmit(handleSubmitBloodBank)}>
            <div className="card-center">
              <MyProfileSelect title="Blood Type" onChange={setBloodType} options={BLOOD_TYPES_REQUEST} />
              <MyProfileSelect title="City" onChange={setLocation} options={LOCATIONS} />
              <Input name="name" defaultValue="" label="name" required={true} />
              <Button className="buton" type="submit">
                Request
              </Button>
            </div>
          </form>
        </FormProvider>
      </Card>
      <div className="requestDiv">
        {showRequest && (
          <ul className="request">
            {listOfRequest.map((element) => {
              return (
                <li key={element.id} className="cardRequest">
                  <Card>
                    <div>Name: {element.requestorName}</div>
                    <div>Blood type: {element.bloodType}</div>
                    <div>City: {element.city}</div>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

const mapProps = (state: RootState) => ({
  reqBloodBankResponse: state.bloodBank.reqBloodBankResponse,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  getBloodBankRequestsCall: dispatch.bloodBank.getBloodBankRequestsCall,
  postBloodRequestReq: dispatch.bloodBank.postBloodRequestReq,
});

export const BloodRequest = connect(mapProps, mapDispatch)(BloodBankComponent);
