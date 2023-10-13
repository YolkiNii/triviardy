import { User } from "./User"
import { Dispatch, SetStateAction } from "react";

export type UserContextType = {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}