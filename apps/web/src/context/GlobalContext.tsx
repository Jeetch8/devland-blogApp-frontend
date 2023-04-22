import { useContext, createContext, useState } from "react";
import { getUserFromLocalStorage } from "../utils/localStorage";

export interface ITokenUser {
  userId: string;
  email: string;
  name: string;
  profile_img: string;
  token: string;
}

interface initStateType {
  user: ITokenUser | null;
  updateGlobalUser: (user: ITokenUser | null) => void;
  isModalOpen: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const initState: initStateType = {
  user: null,
  updateGlobalUser: () => {},
  isModalOpen: false,
  closeModal: () => {},
  openModal: () => {},
};

export const GlobalContext = createContext(initState);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<ITokenUser | null>(
    getUserFromLocalStorage()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateGlobalUser = (user: ITokenUser | null) => {
    setUser(user);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{ user, updateGlobalUser, openModal, closeModal, isModalOpen }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
