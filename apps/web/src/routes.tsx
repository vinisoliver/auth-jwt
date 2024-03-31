import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { registerRoute } from "./pages/register";

const routes = createBrowserRouter([
  { path: '/' },
  registerRoute,
])

export const Routes = () => <RouterProvider router={routes} />

