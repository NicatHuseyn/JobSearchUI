import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import AdminLayout from "../Pages";
import Home from "../Pages/HomePage";
import Dashboard from "../Pages/DashboardPage";
import Company from "../Pages/CompanyPage";
import Industry from "../Pages/IndustryPage";
import Category from "../Pages/CategoryPage";
import Job from "../Pages/JobPage";
import Contact from "../Pages/ContactPage";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "company",
        element: <Company />,
      },
      {
        path: "industry",
        element: <Industry />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "job",
        element: <Job />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
