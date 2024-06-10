import {
  createBrowserRouter,
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
import AddUser from "../Pages/AddUserPage";
import LoginPage from "../Pages/LoginPage";

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
        path: "add-user",
        element: <AddUser />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
