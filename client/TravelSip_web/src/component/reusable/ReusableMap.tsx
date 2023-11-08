import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 10.772622186983478,
  lng: 106.69806371141655,
};

interface ReusableMapProps {
  googleMapsApiKey: string;
  markerName: string;
  width: string;
  height: string;
}
const OPTIONS: {
  maxZoom: number;
} = {
  maxZoom: 18,
};

const ReusableMap: React.FC<ReusableMapProps> = (props) => {
  const { googleMapsApiKey, markerName, width, height } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: googleMapsApiKey,
  });
  return isLoaded ? (
    <div className={`${width} ${height}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={OPTIONS}
        zoom={17}
      >
        <Marker
          position={{ lat: center.lat, lng: center.lng }}
          label={markerName}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ReusableMap);
