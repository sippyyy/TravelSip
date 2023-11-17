import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  color?: "green" | "red" | "blue" | "gray";
  borderColor?: string;
  width?: string;
  flex1?: boolean;
  id?: string;
  value?: string;
  type?: string;
}

const ReusableTextField: React.FC<Props> = ({
  name,
  label,
  color,
  width,
  flex1,
  id,
  value,
  type,
  ...props
}) => {
  const [field] = useField({ ...props, name, value, type });

  return (
    <TextField
      id={id ? id : "custom-css-standard-input"}
      color={color ? color : "green"}
      type={type ? type : "text"}
      sx={{
        width: width,
        flex: flex1 ? 1 : "",
      }}
      {...field}
      {...props}
      label={label}
    />
  );
};

export default ReusableTextField;
