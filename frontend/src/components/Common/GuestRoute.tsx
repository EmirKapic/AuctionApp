import { UserContext } from "contexts/UserContext";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GuestRoute() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (userContext) navigate("/");

  return <Outlet />;
}
