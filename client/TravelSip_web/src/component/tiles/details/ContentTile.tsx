import React from "react";
import ReusableMap from "../../reusable/ReusableMap";
import Divider from "@mui/material/Divider";
interface Props {
  content: string;
}

const ContentTile: React.FC<Props> = (props) => {
  const { content } = props;
  return (
    <div className="flex flex-start">
      <div className="mr-12 flex-1">
        <div className="w-[100%] mb-12">
          <h4 className="text-large font-medium mb-12">Details</h4>
          <p className="text-medium text-gray mr-20">{content}</p>
        </div>
        <Divider color="green" />
        <div className="w-[100%] mt-12">
          <h4 className="text-large font-medium mb-12">Facility and Benefits</h4>
          <p className="text-medium text-gray mr-20">{content}</p>
        </div>
      </div>
      <div className="w-1/2 h-[400px] rounded-xl overflow-hidden">
        <ReusableMap
          width="w-full"
          height="h-full"
          markerName="Hotel Name"
          googleMapsApiKey="AIzaSyDyHQXl-ubGSw9C48PRlZJ6d2wBLfz4Jlc"
        />
      </div>
    </div>
  );
};

export default ContentTile;
