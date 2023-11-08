import React from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";

interface Props {
  label: string;
  name: string;
  color?: string;
  borderColor?: string;
  type?: string;
  width?: string;
  flex1?: boolean;
}

const ReusableTextField: React.FC<Props> = (props) => {
  const { label, name, color, borderColor, type, width, flex1 } = props;
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: color ? color : "#000",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: borderColor ? borderColor : "#000",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: borderColor ? borderColor : "#000",
      },
      "&:hover fieldset": {
        borderColor: borderColor ? borderColor : "#000",
      },
      "&.Mui-focused fieldset": {
        borderColor: borderColor ? borderColor : "#000",
      },
    },
  });

  return (
    <CssTextField
      id="custom-css-standard-input"
      sx={{
        width: width,
        flex: flex1 ? 1 : "",
      }}
      label={label}
      name={name}
      type={type}
    />
  );
};

export default ReusableTextField;
