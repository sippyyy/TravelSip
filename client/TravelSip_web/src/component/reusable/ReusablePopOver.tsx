import React from "react";
import Popover from "@mui/material/Popover";
import { ReusableInfoDetails } from "..";
import { Link } from "react-router-dom";

interface PopOverProps {
  anchorEl: HTMLButtonElement | null;
  handleClose: () => void;
  options: {
    label: string;
    icon?: React.ReactNode;
    clickFunc: () => void;
    link?: string;
  }[];
}

const ReusablePopOver: React.FC<PopOverProps> = (props) => {
  const { anchorEl, handleClose, options } = props;
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
      <ul className="w-full overflow-hidden">
        {options.map((option) => (
          <React.Fragment key={option.label}>
            {option.link ? (
              <Link to={option.link}>
                <li
                  onClick={option.clickFunc}
                  className="px-12 min-w-[120px] text-center py-12 hover:bg-lightRed cursor-pointer"
                >
                  <ReusableInfoDetails
                    label={option.label}
                    icon={option?.icon ?? null}
                  />
                </li>
              </Link>
            ) : (
              <li
                onClick={option.clickFunc}
                className="px-12 min-w-[120px] text-center py-12 hover:bg-lightRed cursor-pointer"
              >
                <ReusableInfoDetails
                  label={option.label}
                  icon={option?.icon ?? null}
                />
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </Popover>
  );
};

export default ReusablePopOver;
