import moment, { defaultFormat } from "moment";

export const now = moment().format("MM-DD-YYYY");
export const tomorrow = moment().add(1, "days").format("MM-DD-YYYY");
