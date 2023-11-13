import React from "react";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  bold?: boolean;
  textColor?: string;
}

const ReusableInfoDetails: React.FC<Props> = (props) => {
  const { icon, label, value, textColor, bold } = props;
  return (
    <div
      className={`flex mt-12 items-center ${
        textColor ? textColor : "text-dark"
      } ${bold ? "font-bold" : ""}`}
    >
      {icon ? <span className="mr-8">{icon}</span> : ""}
      <p className="">{label}</p>
      <p className="ml-8">{value}</p>
    </div>
  );
};

export default ReusableInfoDetails;
