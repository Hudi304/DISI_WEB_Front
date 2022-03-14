import * as React from "react";

import "./add-donation-center-dialog.scss";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import { Button } from "components/button/button";
import { MapForm } from "./donation-center-map/map-component";

export const AddDonationCenterDialog = () => {
  return (
    <div className="map-container">
      <MapForm />
    </div>
  );
};
