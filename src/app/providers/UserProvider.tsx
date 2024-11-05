import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  username: string;
  firstname: string;
  surname: string;
  avatar_url: string;
}

interface UserContext {
  token: string;
  user?: User;
  getUser: () => void;
  logout: () => void;
}

const defaultValues: UserContext = {
  token: "",
  user: undefined,
  getUser: () => null,
  logout: () => null,
};

export const UserContext = createContext(defaultValues);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>(defaultValues.token);

  const getUser = async () => {
    //const res = await fetch(API_URL + "/v1/auth/logout", {
    //  method: "GET",
    //  headers: {
    //    Authorization: "Bearer " + localStorage.getItem("token")
    //  }
    //});
    //const body = await res.json();

    const res = {
      status: localStorage.getItem("token") ? 200 : 400,
    };
    const body = {
      token: "newToken",
      user: {
        id: "aJdk12@+2jf",
        avatar_url: "https://placekeanu.com/48/48",
        username: "Keanu",
        firstname: "Victor",
        surname: "Ivanov",
      },
    };

    if (res.status != 200) {
      return;
    }
    setToken(body["token"]);

    localStorage.setItem("token", body["token"]);

    setUser(body["user"]);
  };

  const logout = async () => {
    if (localStorage.getItem("token")) {
      //const res = await fetch(API_URL + "/v1/auth/user", {
      //  method: "GET",
      //  headers: {
      //    Authorization: "Bearer " + localStorage.getItem("token")
      //  }
      //});
      localStorage.setItem("token", "");
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
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
