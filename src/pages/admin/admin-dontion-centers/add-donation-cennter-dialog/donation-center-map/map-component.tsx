import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Button } from "components/button/button";
import { useState } from "react";
import { Marker } from "./marker";
import { Map } from "./map";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const initialLatitude = 45.8;
const initialLongitude = 24.8;
const initialZoom = 7;

export const MapForm = () => {
  const [clicks, setClicks] = useState<google.maps.LatLng[]>([]);
  const [zoom, setZoom] = useState(initialZoom);
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
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
        width: "250px",
      }}
    >
      <label htmlFor="zoom">Zoom</label>
      <input type="number" id="zoom" name="zoom" value={zoom} onChange={(event) => setZoom(Number(event.target.value))} />
      <br />
      <label htmlFor="lat">Latitude</label>
      <input type="number" id="lat" name="lat" value={center.lat} onChange={(event) => setCenter({ ...center, lat: Number(event.target.value) })} />
      <br />
      <label htmlFor="lng">Longitude</label>
      <input type="number" id="lng" name="lng" value={center.lng} onChange={(event) => setCenter({ ...center, lng: Number(event.target.value) })} />
      <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
      {clicks.map((latLng, i) => {
        const lat = latLng.toJSON().lat;
        const lng = latLng.toJSON().lng;
        return (
          <div>
            <div>{`Latitude : ${lat}`}</div>
            <div>{`Longitude : ${lng}`}</div>
          </div>
        );
      })}
      <Button onClick={() => setClicks([])}>Clear</Button>
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
