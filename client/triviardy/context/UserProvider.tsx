import { createContext, useState } from "react";
import { UserType } from "@/types/UserType";
import { Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user: UserType,
  setUser: Dispatch<SetStateAction<UserType>>
}

const UserContext = createContext<UserContextType>({
  user: {id: null, username: "", host: false},
  setUser: () => {}
});

export function UserProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<UserType>({id: null, username: "", host: false});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext