import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Button } from "components/button/button";
import { useState } from "react";
import { Marker } from "./marker";
import { Map } from "./map";
import { SimpleSelect } from "components/form-components/select/select";
import { CityOptions } from "../../admin-dontation-centers-constants";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const initialLatitude = 45.8;
const initialLongitude = 24.8;
const initialZoom = 6;

export const MapForm = () => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(initialZoom);
  const [donationCenterName, setDonationCenterName] = useState("");

  const [city, setCity] = useState("");

  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: initialLatitude,
    lng: initialLongitude,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setClicks([e.latLng!]);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const form = (
    <div
      style={{
        height: "100%",
        width: "280px",
      }}
      className="map-form"
    >
      <h3 className="text-headline font-semibold text-black">Name</h3>
      <input
        className="input"
        placeholder="Center Name"
        type="text"
        id="name"
        name="name"
        value={donationCenterName}
        onChange={(event) => setDonationCenterName(event.target.value)}
      />
      <h3 className="text-headline font-semibold text-black">Click on map to add Donation Center marker</h3>
      <label htmlFor="zoom">Zoom</label>
      <input className="input" type="number" id="zoom" name="zoom" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
      <br />
      <label htmlFor="lat">Map Latitude</label>
      <input className="input" type="number" id="lat" name="lat" value={center.lat} onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })} />
      <br />
      <label htmlFor="lng">Map Longitude</label>
      <input className="input" type="number" id="lng" name="lng" value={center.lng} onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })} />
      {clicks.map((latLng, i) => {
        const lat = latLng.toJSON().lat;
        const lng = latLng.toJSON().lng;
        return (
          <div key={i} className="donation-cent-mark">
            <div>Donation Center Marker</div>
            <div className="ml-3">{`Lat: ${lat}`}</div>
            <div className="ml-3">{`Lng : ${lng}`}</div>
          </div>
        );
      })}

      {clicks.length > 0 ? <Button onClick={() => setClicks([])}>Clear</Button> : null}

      <SimpleSelect
        className="select-size"
        options={CityOptions}
        value={city}
        onChange={(e) => {
          // console.log(e);
        }}
      />
    </div>
  );

  return (
    <div className="map-container">
      <Wrapper apiKey={"AIzaSyDK21bSJlE3CidGLQ9zCRsiHzrcV0Sjp8c"} render={render}>
        <Map className="map" center={center} onClick={onClick} onIdle={onIdle} zoom={zoom} style={{ flexGrow: "1", height: "100%" }}>
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {form}
    </div>
  );
};
