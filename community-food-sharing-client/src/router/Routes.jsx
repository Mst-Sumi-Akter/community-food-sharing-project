// router/Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import FoodDetails from "../pages/FoodDetails";
import UpdateFood from "../pages/UpdateFood";
import MyFoodRequests from "../pages/MyFoodRequests";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import PrivateRoute from "./PrivateRoute";
import AllFood from "../pages/AllFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import Error404 from "../components/Error404";
import AboutUs from "../pages/AboutUs";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import ContactUs from "../pages/ContactUs";
import AdminDashboard from "../pages/AdminDashboard";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-foods", element: <AllFood></AllFood> },
      { path: "/available-foods", element: <AvailableFoods /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact-us", element: <ContactUs /> },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: <FoodDetails />,
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "*",
        element: <Error404 />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "auth/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "auth/register",
    element: <Register />
  },
  { path: "*", element: <Error404 /> },
]);


export default router;


