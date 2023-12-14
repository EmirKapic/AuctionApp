import { UserContext } from "contexts/UserContext";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userContext) {
      navigate("/");
    }
  }, [userContext]);
  return <Outlet />;
}
