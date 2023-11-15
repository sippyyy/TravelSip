import {
  BookingRequest,
  BusinessInformation,
  MyDestinations,
  MyHotels,
  MyPlaces,
} from "../component";
export const get_content: (tab: number) => React.ReactNode = (tab) => {
  let content;
  switch (tab) {
    case 1:
      content = <MyPlaces />;
      break;
    case 2:
      content = <BusinessInformation />;
      break;
    default:
      content = <BookingRequest />;
      break;
  }
  return content;
};

export const get_content_places: (tab: number) => React.ReactNode = (tab) => {
  let content;
  switch (tab) {
    case 1:
      content = <MyDestinations />;
      break;
    default:
      content = <MyHotels />;
      break;
  }
  return content;
};
