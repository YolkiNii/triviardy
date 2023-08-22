import { createContext, useState } from "react";
import { User } from "@/types/User";
import { UserContextType } from "@/types/UserContextType";

const UserContext = createContext<UserContextType>({
  user: {name: ""},
  setUser: () => {}
});

export function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User>({name: ""});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext