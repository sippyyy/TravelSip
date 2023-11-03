import React from "react";
import { Home } from "./pages";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { NormalLayout } from "./layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NormalLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App