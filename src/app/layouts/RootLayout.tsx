import { FC, PropsWithChildren, StrictMode } from "react";
import { MapProvider, ResponsiveProvider, UserProvider } from "../providers";

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <MapProvider>
        <ResponsiveProvider>
          <UserProvider>{children}</UserProvider>
        </ResponsiveProvider>
      </MapProvider>
    </StrictMode>
  );
};
