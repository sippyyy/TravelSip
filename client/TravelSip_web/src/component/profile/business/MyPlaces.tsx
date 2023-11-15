import React from "react";
import TabBarPlaces from "../TabBarPlaces";
import { get_content_places } from "../../../utils/get_content_business";

const MyPlaces = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <div>
      <TabBarPlaces value={tab} setValue={setTab} />
      <div>{get_content_places(tab)}</div>
    </div>
  );
};

export default MyPlaces;
