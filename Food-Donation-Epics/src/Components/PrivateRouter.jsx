import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Services/auth";

function PrivateRouter() {
  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRouter;
