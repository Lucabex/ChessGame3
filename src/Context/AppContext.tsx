import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

interface User {
  name: string;
  token: string;
}
const UserContext = createContext<
  | {
      user: User;
      setUser: Dispatch<SetStateAction<User>>;
    }
  | undefined
>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const savedToken = localStorage.getItem("token");
    const savedName = localStorage.getItem("name");
    return {
      name: savedName || "",
      token: savedToken || "",
    };
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("user must be used inside the provvider");
  return context;
};
