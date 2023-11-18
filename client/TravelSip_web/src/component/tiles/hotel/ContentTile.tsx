import React from "react";
import ReusableMap from "../../reusable/ReusableMap";
import Divider from "@mui/material/Divider";
import { Reviews, Rooms } from "../..";
interface Props {
  content: string;
  section2?: string;
}

const ContentTile: React.FC<Props> = (props) => {
  const { content, section2} = props;
  return (
    <div className="md:flex md:flex-start">
      <div className="md:mr-12 md:flex-1">
        <div className="w-full mb-12">
          <h4 className="text-large font-medium mb-12">Details</h4>
          <p className="text-medium text-gray md:mr-20">{content}</p>
        </div>
        {section2 ? (
          <>
            <Divider color="green" />
            <div className="w-[100%] my-12">
              <h4 className="text-large font-medium mb-12">{section2}</h4>
              <Rooms />
            </div>
          </>
        ) : null}
      </div>
      <div className="md:w-1/2 w-full ">
        <div className="h-[400px] rounded-xl overflow-hidden">
          <ReusableMap
            width="w-full"
            height="h-full"
            markerName="Hotel Name"
            googleMapsApiKey="AIzaSyDyHQXl-ubGSw9C48PRlZJ6d2wBLfz4Jlc"
          />
        </div>
        <Reviews />
      </div>
    </div>
  );
};

export default ContentTile;
