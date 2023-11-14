import React from "react";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  bold?: boolean;
  textColor?: string;
  size?: string;
  noneMargin?: boolean;
}

const ReusableInfoDetails: React.FC<Props> = (props) => {
  const { icon, label, value, textColor, bold, size, noneMargin } = props;
  return (
    <div
      className={`flex ${noneMargin ? "" : "mt-12"} items-center ${
        size ? size : ""
      } ${textColor ? textColor : "text-dark"} ${bold ? "font-bold" : ""}`}
    >
      {icon ? <span className="mr-8">{icon}</span> : ""}
      <p className="">{label}</p>
      <p className="ml-8">{value}</p>
    </div>
  );
};

export default ReusableInfoDetails;
