import { UserContext } from "contexts/UserContext";
import { PropsWithChildren, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GuestRoute(props: PropsWithChildren) {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  if (userContext) navigate("/");

  return <Outlet />;
}
