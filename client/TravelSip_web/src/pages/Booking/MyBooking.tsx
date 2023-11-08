import React from "react";
import { ReusableTextField } from "../../component";
import { blueBase } from "../../constant/theme";
import { useTheme } from "@mui/material";


const MyBooking: React.FC = () => {
  const theme = useTheme()
  return (
    <ReusableTextField name="haha" color={theme.palette.blue.main} label="test" borderColor={blueBase}/>
  );
};

export default MyBooking;
