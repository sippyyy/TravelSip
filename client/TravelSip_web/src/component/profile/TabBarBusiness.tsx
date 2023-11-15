import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { theme } from "../../constant/theme";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AntTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 4,
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: "50%",
    width: "100%",
    backgroundColor: theme.palette.green.main,
  },
});
const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 20,
  minWidth: 200,
  marginRight: 12,
  textTransform: "none",
  transition: "all 0.5s",
  fontSize: "15px",
  color: theme.palette.green.light,
  "&.Mui-selected": {
    color: theme.palette.green.main,
    fontWeight: 600,
  },
  "&.Mui-focusVisible": {},
}));

interface StyledTabProps {
  label: string;
}

interface TabBarBusinessProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const TabBarBusiness: React.FC<TabBarBusinessProps> = (props) => {
  const { value, setValue } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AntTabs value={value} onChange={handleChange} centered>
          <AntTab label="Booking Requests" />
          <AntTab label="Hotel(s)/Destination(s)" />
          <AntTab label="Information" />
        </AntTabs>
      </Box>
    </Box>
  );
};

export default TabBarBusiness;
