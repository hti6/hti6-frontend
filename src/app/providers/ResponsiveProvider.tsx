import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

type ResponsiveStatus = "mobile" | "tablet" | "desktop";

type ResponsiveContext = {
  status: ResponsiveStatus;
};
const defaultValues: ResponsiveContext = {
  status: "desktop",
};

export const ResponsiveContext = createContext(defaultValues);

export const ResponsiveProvider: FC<PropsWithChildren> = ({ children }) => {
  const [status, setStatus] = useState<ResponsiveStatus>(defaultValues.status);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) setStatus("desktop");
      if (window.innerWidth < 1024 && window.innerWidth >= 768)
        setStatus("tablet");
      if (window.innerWidth < 768) {
        setStatus("mobile");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={{ status }}>
      {children}
    </ResponsiveContext.Provider>
  );
};
