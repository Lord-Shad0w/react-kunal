import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Outlet } from "react-router";
import HeaderComponent from "./components/Header";
import Body from "./components/Body";
import Error from "./components/ErrorPage";
import About from "./components/About";
import Support from "./components/Support";
import { ShopShimmer } from "./components/ShimmerLoad";

const RestaurantShop = lazy(() => import("./components/RestaurantShop"));

const AppLayout = () => (
  <>
    <header>
      <div className="main-header">
        <HeaderComponent />
      </div>
    </header>
    <main>
      <Outlet />
    </main>
  </>
);

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/restaurants/:resId",
        element: (
          <Suspense fallback = {<ShopShimmer />}>
            <RestaurantShop />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
