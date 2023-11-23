import dayjs from "dayjs";
export const day_format: (day: string) => string = (day: string) => {
  return dayjs(day).format("MMM D, YYYY");
};

export const day_be_format: (day: string) => string = (day: string) => {
  return dayjs(day).format("YYYY-MM-DD");
};
