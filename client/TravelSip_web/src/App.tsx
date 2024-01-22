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
  Country,
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
import { ReusableModal } from "./component";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./constant/theme";
import PrivateRoutes from "./routes/PrivateRoutes";
import AuthProvider from "./context/AuthProvider";
import ProfileProvider from "./context/ProfileProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NormalLayout />}>
        <Route index element={<Home />} />
        <Route
          path="bookings"
          element={
            <PrivateRoutes>
              <MyBooking />
            </PrivateRoutes>
          }
        />
      </Route>
      <Route element={<NormalLayoutChild />}>
        <Route
          path="booking/:id"
          element={
            <PrivateRoutes>
              <BookingDetails />
            </PrivateRoutes>
          }
        />
        <Route path="country/:id" element={<Country />} />
        <Route path="hotel/:id" element={<HotelDetails />} />
        <Route path="destination/:id" element={<DestinationDetails />} />
      </Route>
      <Route element={<ProfileLayout />}>
        <Route
          path="profile/"
          element={
            <PrivateRoutes>
              <InformationUser />
            </PrivateRoutes>
          }
        />
        <Route
          path="settings/"
          element={
            <PrivateRoutes>
              <Settings />
            </PrivateRoutes>
          }
        />
        <Route
          path="terms/"
          element={
            <PrivateRoutes>
              <TermOfPayment />
            </PrivateRoutes>
          }
        />
        <Route
          path="my_business/"
          element={
            <PrivateRoutes>
              <MyBusiness />
            </PrivateRoutes>
          }
        />
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
      <AuthProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
          <ReusableModal />
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
