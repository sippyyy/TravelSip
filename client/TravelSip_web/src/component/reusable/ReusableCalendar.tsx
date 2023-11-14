import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CalendarProps {
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
  label?: string;
  padding?: string;
  flex1?: boolean;
  size?: string;
}

const ReusableCalendar: React.FC<CalendarProps> = (props) => {
  const { day, setDay, defaultValue, label, padding, flex1, size } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ flex: flex1 ? 1 : 0 }}
        value={dayjs(day)}
        onChange={(newValue) =>
          setDay(newValue ? newValue.format("MM-DD-YYYY") : "")
        }
        slotProps={{
          openPickerIcon: {
            fontSize: "25px",
            padding: padding ? padding : "8px",
          },
          openPickerButton: { color: "green" },
          textField: {
            label: label ? label : "",
            color: "green",
            size: "small",
            inputProps: {
              style: {
                padding: padding ? padding : "8px",
                fontSize: size ? size : "12px",
                width: "100%",
                flex: flex1 ? 1 : "0",
              },
            },
          },
        }}
        defaultValue={dayjs(defaultValue)}
      />
    </LocalizationProvider>
  );
};

export default ReusableCalendar;
