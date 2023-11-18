import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import { styled } from "@mui/material";
import { FiBriefcase } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface StyledTabProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  showLabel?: boolean;
}

const AntTab = styled((props: StyledTabProps) => (
  <BottomNavigationAction disableRipple {...props} />
))(({ theme }) => ({
  color: theme.palette.gray.light,
  "&.Mui-selected": {
    color: theme.palette.red.main,
  },
  "&.MuiBottomNavigationAction-iconOnly": {
    fontSize: 25,
  },
}));

const NavBarMobile = () => {
  const [value, setValue] = React.useState("/");
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault()
    setValue(newValue);
    navigate(newValue)
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1] md:hidden shadow-3xl">
      <BottomNavigation
        className="w-full"
        value={value}
        onChange={handleChange}
      >
        <AntTab label="Home" value="/" icon={<IoHomeOutline />} />
        <AntTab label="My Bookings" value="/bookings" icon={<FiBriefcase />} />
        <AntTab label="Profile" value="/profile" icon={<FaRegUser />} />
      </BottomNavigation>
    </div>
  );
};

export default NavBarMobile;
