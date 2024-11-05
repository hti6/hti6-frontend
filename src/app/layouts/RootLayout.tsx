import { FC, PropsWithChildren, StrictMode } from "react";
import { ResponsiveProvider, UserProvider } from "../providers";

export const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <ResponsiveProvider>
        <UserProvider>{children}</UserProvider>
      </ResponsiveProvider>
    </StrictMode>
  );
};
