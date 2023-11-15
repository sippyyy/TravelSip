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
  minHeight: 20,
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    height: 4,
  }
});
const AntTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 10,
  minWidth: 140,
  marginRight: 12,
  minHeight: 20,
  padding: 2,
  border: `1px solid ${theme.palette.green.light}`,
  textTransform: "none",
  transition: "all 0.5s",
  fontSize: "15px",
  color: theme.palette.green.light,
  "&.Mui-selected": {
    color: theme.palette.white.main,
    backgroundColor: theme.palette.green.main,
    fontWeight: 600,
  },
  "&.Mui-focusVisible": {},
}));

interface StyledTabProps {
  label: string;
}

interface TabBarPlacesProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const TabBarPlaces: React.FC<TabBarPlacesProps> = (props) => {
  const { value, setValue } = props;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault();
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <AntTabs value={value} onChange={handleChange} centered>
          <AntTab label="Accommodation" />
          <AntTab label="Destination" />
        </AntTabs>
      </Box>
    </Box>
  );
};

export default TabBarPlaces;
