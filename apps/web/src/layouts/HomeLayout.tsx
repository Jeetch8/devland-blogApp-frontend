import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Modal />
    </div>
  );
};

export default HomeLayout;
