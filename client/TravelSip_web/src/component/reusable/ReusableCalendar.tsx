import React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface CalendarProps {
  day: string;
  setDay: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
}

const ReusableCalendar: React.FC<CalendarProps> = (props) => {
  const { day, setDay, defaultValue } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dayjs(day)}
        onChange={(newValue) => setDay(newValue ? newValue.format("MM-DD-YYYY") : "")}
        slotProps={{
          openPickerIcon: { fontSize: "25px", padding: "8px" },
          openPickerButton: { color: "green" },
          textField: {
            color: "green",
            size: "small",
            inputProps: {
              style: { padding: "8px", fontSize: "12px", width: "100%" },
            },
          },
        }}
        defaultValue={dayjs(defaultValue)}
      />
    </LocalizationProvider>
  );
};

export default ReusableCalendar;
