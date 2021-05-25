import { Marker } from "google-maps-react";
import React from "react";
import GoogleMapReact from "google-map-react";

let mapOptions = {
  disableDefaultUI: false,
  gestureHandling: "none",
  zoomControl: true,
  scaleControl: true,
  zoomControlOptions: false,
  scrollwheel: true,
  panControl: true,
};
const ModelsMap = ({ current, place }) => {
  const marker = (map, maps) => {
    let marker = new maps.Marker({
      position: current,
      map,
      title: "Current Location",
    });
    return marker;
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        defaultCenter={current}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => marker(map, maps)}
      >
        {/* <Marker
          lat={current.lat}
          lng={current.lng}
          name="hi"
          color="blue"
        ></Marker> */}
      </GoogleMapReact>
    </div>
  );
};
export default ModelsMap;
