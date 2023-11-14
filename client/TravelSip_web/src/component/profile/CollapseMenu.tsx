import React from "react";
import { ReusableInfoDetails } from "..";
import { FaChevronDown } from "react-icons/fa";
import { Collapse, Divider } from "@mui/material";

interface CollapseMenuProps {
  icon?: React.ReactNode;
  label: string;
  value?: string;
  list: string[];
  img?: string;
  img2?: string;
}

const CollapseMenu: React.FC<CollapseMenuProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const { icon, label, value, list, img, img2 } = props;
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="my-20">
      <div
        onClick={() => handleClick()}
        className="flex justify-between items-center rounded-2xl p-12 shadow-md hover:shadow-lg"
      >
        <ReusableInfoDetails
          icon={icon}
          label={label}
          size={"text-medium"}
          bold
          noneMargin
        />
        <div className="flex items-center">
          {img ? <img className="w-[30px] mr-8" src={img} /> : null}
          <p className="text-medium mr-12">{value}</p>
          <FaChevronDown />
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ul>
          {list.map((item) => (
            <React.Fragment key={item}>
              <li className="p-12 flex justify-between">
                <p>{item}</p>
                {img2 ? <img className="w-[30px] mr-8" src={img2} /> : null}
              </li>
              <Divider />
            </React.Fragment>
          ))}
        </ul>
      </Collapse>
    </div>
  );
};

export default CollapseMenu;
