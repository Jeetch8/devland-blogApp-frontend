import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const PrivateRoute = () => {
  const { user, openModal } = useGlobalContext();

  if (!user) {
    openModal();
    return;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
