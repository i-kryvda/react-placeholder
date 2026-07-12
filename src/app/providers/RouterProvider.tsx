import { RouterProvider } from "react-router";
import AppProvider from "./AppProvider";
import { router } from "../router/router";

export const AppRouter = () => (
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>
);
