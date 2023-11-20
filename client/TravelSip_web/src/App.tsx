import React from "react";
import {
  BookingDetails,
  DestinationDetails,
  Home,
  HotelDetails,
  InformationUser,
  Login,
  MyBooking,
  MyBusiness,
  Register,
  Settings,
  TermOfPayment,
} from "./pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  LoginLayout,
  NormalLayout,
  NormalLayoutChild,
  ProfileLayout,
} from "./layout";
import { Country, ReusableModal } from "./component";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./constant/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NormalLayout />}>
        <Route index element={<Home />} />
        <Route path="bookings" element={<MyBooking />} />
      </Route>
      <Route element={<NormalLayoutChild />}>
        <Route path="booking/:id" element={<BookingDetails />} />
        <Route path="country" element={<Country />} />
        <Route path="hotel/:id" element={<HotelDetails />} />
        <Route path="destination/:id" element={<DestinationDetails />} />
      </Route>
      <Route element={<ProfileLayout />}>
        <Route path="profile/" element={<InformationUser />} />
        <Route path="settings/" element={<Settings />} />
        <Route path="terms/" element={<TermOfPayment />} />
        <Route path="my_business/" element={<MyBusiness />} />
      </Route>
      <Route element={<LoginLayout />}>
        <Route path="login/" element={<Login />} />
        <Route path="register/" element={<Register />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <ReusableModal />
      </ThemeProvider>
  );
};

export default App;
