import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";

import LoginPage from "@/pages/LoginPage/LoginPage";
import AuthLayout from "../layout/AuthLayout/AuthLayout";
import RootLayout from "../layout/RootLayout/RootLayout";
import RequireAuthGuard from "./guards/RequireAuthGuard";
import { GlobalError } from "@/shared/ui/GlobalError/GlobalError";
// import { GlobalError } from "@/shared/ui/GlobalError";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Feed = lazy(() => import("@/pages/Feed"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuthGuard />,
    children: [
      {
        element: <RootLayout />,
        errorElement: <GlobalError />,
        children: [
          { index: true, element: <Home></Home> },
          { path: "about", element: <About></About>, errorElement: <div>About Error</div> },
          {
            path: "feed",
            errorElement: <div>error feed</div>,
            element: (
              <Suspense fallback={<div>loading...</div>}>
                {/* Тут може бути ErrorBoundery */}
                <Feed />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { index: true, element: <Navigate to="login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <div>register</div> },
    ],
  },
]);
