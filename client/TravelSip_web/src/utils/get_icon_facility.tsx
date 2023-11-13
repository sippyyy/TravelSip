import { BsSnow, BsWifi } from "react-icons/bs";
import {
  MdBalcony,
  MdBathtub,
  MdOutlineLocalLaundryService,
  MdDryCleaning,
} from "react-icons/md";
import { GiWindow, GiMeal } from "react-icons/gi";
import { BiLandscape } from "react-icons/bi";

type FacilityIcons = {
  [key: string]: JSX.Element | null;
};

export function getIconForFacility(facilityKey: string): JSX.Element | null {
  const icons: FacilityIcons = {
    air_conditioner: <BsSnow />,
    wifi: <BsWifi />,
    balcony: <MdBalcony />,
    window: <GiWindow />,
    private_bathroom: <MdBathtub />,
    breakfast: <GiMeal />,
    view: <BiLandscape />,
    laundry: <MdOutlineLocalLaundryService />,
    cleaning_room: <MdDryCleaning />,
  };

  return icons[facilityKey] || null;
}
