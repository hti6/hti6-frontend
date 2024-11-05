import { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveProvider";
import { UserContext } from "./UserProvider";

export { ResponsiveProvider } from "./ResponsiveProvider";
export { UserProvider } from "./UserProvider";

export const useResponsive = () => useContext(ResponsiveContext);
export const useUser = () => useContext(UserContext);
