import { CircularProgress } from "@mui/material";
import React from "react";

const ReusableLoadingModal: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <CircularProgress color="green" />
      <p className="text-small text-grey mt-20">Data is loading, please wait for a moment...</p>
    </div>
  );
};

export default ReusableLoadingModal;
