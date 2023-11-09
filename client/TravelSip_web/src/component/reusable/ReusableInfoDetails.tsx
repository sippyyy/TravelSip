import React from "react";

interface Props {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  bold?: boolean;
}

const ReusableInfoDetails: React.FC<Props> = (props) => {
  const { icon, label, value } = props;
  return (
    <div className="flex mt-12">
      {icon ? <span className="mr-8">{icon}</span> : ""}
      <p className="text-dark">{label}</p>
      <p className="text-dark ml-8">{value}</p>
    </div>
  );
};

export default ReusableInfoDetails;
