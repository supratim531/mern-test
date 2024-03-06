import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBord from "../pages/DashBord";
import CreateEmployee from "../pages/CreateEmployee";
import EmployeeList from "../pages/EmployeeList";
import EmployeeEdit from "../pages/EmployeeEdit";
import Page404 from "../pages/Page404";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<ProtectedRoute children={<App />} />}>
        <Route path={''} element={<DashBord />} />
        <Route path={"create-employee"} element={<CreateEmployee />} />
        <Route path={"employee-list"} element={<EmployeeList />} />
        <Route path={"edit-employee/:f_Id"} element={<EmployeeEdit />} />
        <Route path={"*"} element={<Page404 />} />
      </Route>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/register"} element={<Register />} />
    </>
  )
);

export default router;
