import React from "react";
import Popover from "@mui/material/Popover";

interface PopOverProps {
  anchorEl: HTMLButtonElement;
  handleClose: () => void;
  options: React.ReactNode;
}

const ReusablePopOver: React.FC<PopOverProps> = (props) => {
  const { anchorEl, handleClose, options } = props;
  console.log(options)
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div className="bg-white min-w-[150px] rounded-full">{options}</div>
    </Popover>
  );
};

export default ReusablePopOver;
