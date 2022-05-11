import { FC, useEffect, useState } from "react";
import "./requirements-for-donation.scss";
import * as yup from "yup";

import { connect } from "react-redux";
import { RootDispatch, RootState } from "store";
import { useNavigate } from "react-router-dom";
import { Card } from "components/card/card";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components/button/button";
import MultiRangeSlider from "./multislider";
import { SimpleSelect } from "components/form-components/select/select";
// import Select from 'react-select'
import { DonationRequirementsDTO } from "common/models/DonationRequirementsDTO";

const schema = yup.object({});

export interface Option {
  value: any;
  label: string | React.ReactNode;
  disabled?: boolean;
}

var defaultOption: Option = { value: null, label: "NULL", disabled: false };

type Props = ReturnType<typeof mapProps> & ReturnType<typeof mapDispatch>;

const ReqDonationComponent: FC<Props> = ({ reqDonationResponse, getReqDonation, updateReqDonation }: Props) => {
  const [optionTattoo, setOptionTattoo] = useState(defaultOption);
  const [optionBlood, setOptionBlood] = useState(defaultOption);
  const [optionDisease, setOptionDisease] = useState(defaultOption);
  const [optionAntibiotics, setOptionAntibiotics] = useState(defaultOption);
  const [optionMedication, setOptionMedication] = useState(defaultOption);
  const [optionHeart, setOptionHeart] = useState(defaultOption);
  const [optionWeeks, setOptionWeeks] = useState(defaultOption);
  const [optionVenereal, setOptionVenereal] = useState(defaultOption);

  const [minAge, setMinAge] = useState(reqDonationResponse.minAge ?? 0);
  const [maxAge, setMaxAge] = useState(reqDonationResponse.maxAge ?? 0);
  const [minWeight, setMinWeight] = useState(reqDonationResponse.minWeight ?? 0);
  const [maxWeight, setMaxWeight] = useState(reqDonationResponse.maxWeight ?? 0);
  let options: Option[] = [
    {
      value: true,
      label: "True",
      disabled: false,
    },
    {
      value: false,
      label: "False",
      disabled: false,
    },
    {
      value: null,
      label: "Null",
      disabled: false,
    },
  ];

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
      countOption: "",
    },
  });

  async function getRequirements() {
    await getReqDonation();
  }

  useEffect(() => {
    getRequirements();
  }, []);

  useEffect(() => {
    // setMinAge(reqDonationResponse.minAge);
    // setMaxAge(reqDonationResponse.maxAge);
    // console.log("MINIM", minAge);
    // setMinWeight(reqDonationResponse.minWeight);
    // setMaxWeight(reqDonationResponse.maxWeight);
    changeOptionAntibiotics(setOption(reqDonationResponse.isAllergic));
    changeOptionTattoo(setOption(reqDonationResponse.hasTattooOrPiercing));
    changeOptionBlood(setOption(reqDonationResponse.hasDonatedBlood));
    changeOptionDisease(setOption(reqDonationResponse.hasBloodTransmittedDisease));
    changeOptionMedication(setOption(reqDonationResponse.hasTakenAntibiotics));
    changeOptionHeart(setOption(reqDonationResponse.hasHeartProblems));
    changeOptionWeeks(setOption(reqDonationResponse.hasGivenBirth));
    changeOptionVenereal(setOption(reqDonationResponse.hasHadVenerealDiseases));
  }, [reqDonationResponse]);

  function setOption(value: any): Option {
    switch (value) {
      case true: {
        return options[0];
      }
      case false: {
        return options[1];
      }
      default: {
        return options[2];
      }
    }
  }

  function chnageMinAge(min: number) {
    setMinAge(min);
  }

  function changeOptionTattoo(o: Option) {
    setOptionTattoo(o);
  }
  function changeOptionBlood(o: Option) {
    setOptionBlood(o);
  }
  function changeOptionDisease(o: Option) {
    setOptionDisease(o);
  }
  function changeOptionAntibiotics(o: Option) {
    setOptionAntibiotics(o);
  }
  function changeOptionMedication(o: Option) {
    setOptionMedication(o);
  }
  function changeOptionHeart(o: Option) {
    setOptionHeart(o);
  }
  function changeOptionWeeks(o: Option) {
    setOptionWeeks(o);
  }
  function changeOptionVenereal(o: Option) {
    setOptionVenereal(o);
  }

  function reqDonationSubmit(values: any) {
    var body: DonationRequirementsDTO = {
      minAge: minAge,
      maxAge: maxAge,
      minWeight: minWeight,
      maxWeight: maxWeight,
      hasTattooOrPiercing: optionTattoo.value,
      hasDonatedBlood: optionBlood.value,
      hasBloodTransmittedDisease: optionDisease.value,
      hasTakenAntibiotics: optionMedication.value,
      hasHeartProblems: optionHeart.value,
      hasGivenBirth: optionWeeks.value,
      hasHadVenerealDiseases: optionVenereal.value,
      isAllergic: optionAntibiotics.value,
    };

    updateReqDonation(body);
    // console.log("FORM", values);
    getRequirements();
    // getReqDonation();
    // console.log("DONATION", reqDonationResponse);
  }

  function changeAge(min: number, max: number) {}

  return (
    <div className="req-donation-page-container">
      <Card className="req-donation-card">
        Requirements for donation
        <FormProvider {...methods}>
          <form className="sign-up-form" onSubmit={methods.handleSubmit(reqDonationSubmit)}>
            <div> Select age range</div>
            <MultiRangeSlider
              min={0}
              max={100}
              minV={minAge}
              maxV={maxAge}
              onChange={({ min, max }: { min: number; max: number }) => {
                // console.log(`AGE min = ${min}, max = ${max}`);
                setMinAge(min);
                setMaxAge(max);
              }}
            />
            <div> Select weight range</div>
            <MultiRangeSlider
              min={0}
              max={300}
              minV={minWeight}
              maxV={maxWeight}
              onChange={({ min, max }: { min: number; max: number }) => {
                // console.log(`WEIGHT min = ${min}, max = ${max}`);
                setMinWeight(min);
                setMaxWeight(max);
              }}
            />
            <div>
              {" "}
              Age between {minAge} and {maxAge}{" "}
            </div>
            <div>
              {" "}
              Weight between {minWeight}KG and {maxWeight}KG{" "}
            </div>
            <div className="input-columns">
              <div className="text-size">Did you have a tattoo / piercing in the last year ?</div>
              <SimpleSelect className="select-size" options={options} value={optionTattoo.value} onChange={changeOptionTattoo} />
            </div>
            <div className="input-columns">
              <div className="text-size">Did you donate blood in the last 3 months ?</div>
              <SimpleSelect className="select-size" options={options} value={optionBlood.value} onChange={changeOptionBlood} />
            </div>
            <div className="input-columns">
              <div className="text-size">Do you have any blood transmitted disease ? Did you have any in the past ?</div>
              <SimpleSelect className="select-size" options={options} value={optionDisease.value} onChange={changeOptionDisease} />
            </div>
            <div className="input-columns">
              <div className="text-size">Are you allergic to any antibiotics ?</div>
              <SimpleSelect className="select-size" options={options} value={optionAntibiotics.value} onChange={changeOptionAntibiotics} />
            </div>
            <div className="input-columns">
              <div className="text-size">Are you taking antibiotics medication or were you in the past week ?</div>
              <SimpleSelect className="select-size" options={options} value={optionMedication.value} onChange={changeOptionMedication} />
            </div>
            <div className="input-columns">
              <div className="text-size">Did you have any heart problems in the last 6 months ?</div>
              <SimpleSelect className="select-size" options={options} value={optionHeart.value} onChange={changeOptionHeart} />
            </div>
            <div className="input-columns">
              <div className="text-size">Did you give birth less than 6 weeks ago ?</div>
              <SimpleSelect className="select-size" options={options} value={optionWeeks.value} onChange={changeOptionWeeks} />
            </div>
            <div className="input-columns">
              <div className="text-size">Did you have any venereal diseases in the last 3 months ?</div>
              <SimpleSelect className="select-size" options={options} value={optionVenereal.value} onChange={changeOptionVenereal} />
            </div>
            <div className="login-buttons-bar">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

const mapProps = (state: RootState) => ({
  reqDonationResponse: state.reqDonation.reqDonationResponse,
});

const mapDispatch = (dispatch: RootDispatch) => ({
  getReqDonation: dispatch.reqDonation.getReqDonationCall,
  updateReqDonation: dispatch.reqDonation.updateDonationReq,
});

export const ReqDonation = connect(mapProps, mapDispatch)(ReqDonationComponent);
