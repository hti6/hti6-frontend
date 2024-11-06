import { API_URL } from "@/shared/env";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  name: string;
  login: string;
}

interface UserContext {
  token: string;
  user?: User;
  getUser: () => void;
  rememberToken: (token: string, remember: boolean) => void;
  logout: () => void;
}

const defaultValues: UserContext = {
  token: "",
  user: undefined,
  getUser: () => null,
  rememberToken: () => null,
  logout: () => null,
};

export const UserContext = createContext(defaultValues);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>(defaultValues.token);

  const rememberToken = (token: string, remember: boolean) => {
    setToken(token);
    if (remember) localStorage.setItem("token", token);
  };

  const getUser = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    const res = await fetch(API_URL + "/v1/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const body = await res.json();

    if (res.status != 200) {
      return;
    }
    setToken(localStorage.getItem("token") as string);

    console.log(localStorage.getItem("token"), token);

    setUser(body["result"]);
  };

  const logout = async () => {
    if (localStorage.getItem("token")) {
      const res = await fetch(API_URL + "/v1/auth/logout", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (res.status == 200) localStorage.setItem("token", "");
    }

    setUser(undefined);
    setToken("");
  };

  useEffect(() => {
    getUser();
  }, []);

  const values = {
    token,
    user,
    logout,
    getUser,
    rememberToken,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
