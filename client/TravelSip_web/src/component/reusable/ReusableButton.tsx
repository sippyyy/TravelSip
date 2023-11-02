import React from "react";

interface Props {
  btnText: string;
  bg?: string;
  textColor?: string;
  border?: boolean;
  borderColor?: string;
  width: string;
  flex1?: boolean;
}

const ReusableButton: React.FC<Props> = (props) => {
  const { btnText, bg, textColor, border, borderColor, width, flex1 } = props;
  return (
    <button
      className={`${bg} ${textColor} ${
        border ? "border" : ""
      } ${borderColor} font-bold ${width} ${
        flex1 ? "flex-1" : ""
      } p-12 rounded-lg `}
    >
      {btnText}
    </button>
  );
};

export default ReusableButton;
