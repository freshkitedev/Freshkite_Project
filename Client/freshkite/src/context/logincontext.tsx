import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the type for the context
interface LoginContextType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

// Create the context, setting it initially as undefined
export const LoginContext = createContext<LoginContextType | undefined>(undefined);

// Create a provider to supply the context values
export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <LoginContext.Provider value={{ showModal, setShowModal, isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
