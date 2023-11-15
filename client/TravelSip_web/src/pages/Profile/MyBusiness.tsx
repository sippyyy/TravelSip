import React, { useState } from "react";
import { TabBarBusiness } from "../../component";
import { get_content } from "../../utils/get_content_business";


const MyBusiness = () => {
  const [tab, setTab] = useState(2);
  return (
    <div>
      <TabBarBusiness value={tab} setValue={setTab} />
      <div className="p-12 m-12 rounded-2xl bg-white">{get_content(tab)}</div>
      
    </div>
  );
};

export default MyBusiness;
