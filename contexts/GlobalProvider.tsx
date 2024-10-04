import firebaseService from "@/services/firebase";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const GlobalContext = createContext<any>(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebaseService.auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
  }, [isLoggedIn]);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </GlobalContext.Provider>
  );
};
