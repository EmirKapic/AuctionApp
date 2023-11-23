import User from "models/User";
import { createContext } from "react";

export const UserContext = createContext<User | undefined>(undefined);
