import { useContext } from "react";
import { ResponsiveContext } from "./ResponsiveProvider";
import { UserContext } from "./UserProvider";
import { MapContext } from "./MapProvider";

export { ResponsiveProvider } from "./ResponsiveProvider";
export { UserProvider } from "./UserProvider";
export { MapProvider } from "./MapProvider";

export const useResponsive = () => useContext(ResponsiveContext);
export const useUser = () => useContext(UserContext);
export const useMap = () => useContext(MapContext);
