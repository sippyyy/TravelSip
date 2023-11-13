export const get_color_status: (
  status: "rejected" | "approved" | "completed" | "expired" | "pending",
  type?: "bg" | "text" | "border"
) => string = (
  status: "rejected" | "approved" | "completed" | "expired" | "pending",
  type?: "bg" | "text" | "border"
) => {
  let bg;
  switch (status) {
    case "rejected":
      bg = `${type ? type : "text"}-red`;
      break;
    case "approved":
      bg = `${type ? type : "text"}-lightGreen`;
      break;
    case "completed":
      bg = `${type ? type : "text"}-green`;
      break;
    case "expired":
      bg = `${type ? type : "text"}-gray`;
      break;
    default:
      bg = `${type ? type : "text"}-blue`;
      break;
  }
  return bg;
};
