import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const TopNavMobile: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.pathname.split("/");
  return (
    <div className="flex p-12 justify-between items-center w-full shadow-3xl md:hidden bg-white">
      <div className="text-xxLarge text-red" onClick={() => navigate(-1)}>
        <IoChevronBackOutline />
      </div>
      <h1 className="font-bold text-large text-center text-red">
        {title.length === 3 ? title?.[1].toUpperCase() + " #" + title?.[2] : ""}
      </h1>
      <div className="w-[12px] h-[12px]"></div>
    </div>
  );
};

export default TopNavMobile;
