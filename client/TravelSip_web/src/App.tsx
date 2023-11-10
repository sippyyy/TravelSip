import React from "react";
import {
  DestinationDetails,
  Home,
  HotelDetails,
  HotelRooms,
  MyBooking,
} from "./pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NormalLayout } from "./layout";
import { Country, ReusableDrawer } from "./component";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./constant/theme";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NormalLayout />}>
        <Route index element={<Home />} />
        <Route path="bookings" element={<MyBooking />} />
        <Route path="country" element={<Country />} />
        <Route path="hotel/:id" element={<HotelDetails />} />
        <Route path="destination/:id" element={<DestinationDetails />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <ReusableDrawer />
    </ThemeProvider>
  );
};

export default App;
