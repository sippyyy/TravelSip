import React from "react";
import TabBarPlaces from "../TabBarPlaces";
import { get_content_places } from "../../../utils/get_content_business";
import { IoMdAdd } from "react-icons/io";
import { Tooltip } from "@mui/material";
import { showDrawer } from "../../reusable/ReusableDrawer";
import { FormPlace } from "../..";
import { useSafeState } from "ahooks";

const MyPlaces: React.FC = () => {
  const [tab, setTab] = React.useState<number>(0);
  const [newData, setNewData] = useSafeState<boolean>(true);

  const handleAddPlace = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showDrawer(<FormPlace setNewData={setNewData} tab={tab} />, "right");
  };

  return (
    <div className="relative h-full">
      <TabBarPlaces value={tab} setValue={setTab} />
      <div>{get_content_places(tab,newData,setNewData)}</div>
      <Tooltip title="Create new" arrow>
        <button
          onClick={(e) => {
            handleAddPlace(e);
          }}
          className="fixed flex items-center justify-center rounded-full bg-green border border-4 border-lightGreen w-[60px] h-[60px] bottom-[20px] right-[20px] hover:bg-lightGreen hover:border-green"
        >
          <IoMdAdd className="text-white text-[40px]" />
        </button>
      </Tooltip>
    </div>
  );
};

export default MyPlaces;
