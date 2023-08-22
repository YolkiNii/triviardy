import { User } from "./User"

export type UserContextType = {
  user: User;
  setUser: (user : User) => void;
}