import {LogoIcon, SolarUsers} from "@/shared/icons";
import { FC } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { sidebarLinks } from "../links";
import {useUser} from "@/app/providers";

function getLabelByRoute(route: string): string {
  switch (route) {
    case "/applications":
      return "заявки";
    case "/video":
      return "камеры";
    case "/map":
      return "карта";
    default:
      return "зрение";
  }
}

export const SidebarWidget: FC = () => {
  const { user } = useUser();
  const location = useLocation();
  return (
    <nav className="flex flex-col pt-6 px-4 flex-shrink-0 w-[256px]">
      <Link className="flex gap-3" to="/">
        <div>
          <LogoIcon />
        </div>
        <div className="uppercase display-s-strong leading-8 font-heading">
          <h1>НЕЙРО</h1>
          <h1 className="text-accent">{getLabelByRoute(location.pathname)}</h1>
        </div>
      </Link>
      <ul className="mt-8">
        {sidebarLinks.map((link) => (
          <li key={link.href}>
            <NavLink
              className={({ isActive }) =>
                [
                  isActive ? "bg-bg-surface1 text-accent" : "text-fg-muted",
                  "flex gap-[10px] [&>svg]:fill-current p-5 items-center rounded-m",
                ].join(" ")
              }
              to={link.href}
            >
              <link.Icon />
              <span className="body-l-strong text-fg">{link.label}</span>
            </NavLink>
          </li>
        ))}
        {user?.is_admin ? (
            <li className="">
              <NavLink
                  className={({isActive}) =>
                      [
                        isActive ? "bg-bg-surface1 text-accent" : "text-fg-muted",
                        "flex gap-[10px] [&>svg]:fill-current p-5 items-center rounded-m",
                      ].join(" ")
                  }
                  to={"/admin"}
              >
                <SolarUsers/>
                <span className="body-l-strong text-fg">Пользователи</span>
              </NavLink>
            </li>
        ) : null}
      </ul>
    </nav>
  );
};
