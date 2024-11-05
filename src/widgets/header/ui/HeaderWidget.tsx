import { SolarNotificationBellIcon } from "@/shared/icons";
import { SolarUserRoundedIcon } from "@/shared/icons/solar-user-rounded";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { IconButton } from "@/shared/ui/button";
import { FC } from "react";
import { useLocation } from "react-router-dom";

function getLabelByRoute(route: string): string {
  switch (route) {
    case "/applications":
      return "заявки";
    case "/video":
      return "камеры";
    case "/map":
      return "карта";
    default:
      return "Добро пожаловать в Нейро Портал!";
  }
}

function getApplications(): { status: string; count: number }[] {
  return [
    { status: "notread", count: 234 },
    { status: "read", count: 154 },
  ];
}

export const HeaderWidget: FC = () => {
  const location = useLocation();
  return (
    <header className="mb-2">
      <div className="flex justify-between p-6 items-center rounded-b-l bg-bg-surface1">
        {location.pathname == "/applications" ||
          location.pathname == "/video" ? (
          <div className="flex items-center gap-4">
            <h1 className="uppercase heading-1">
              {getLabelByRoute(location.pathname)}
            </h1>
            <span>Всего: {569}</span>
            {location.pathname == "/applications" && (
              <ul className="flex gap-3">
                {getApplications().map((app) => (
                  <li className="flex gap-1 items-center body-s-strong text-fg">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        app.status == "notread" ? "bg-neutral" : "bg-success",
                      )}
                    />
                    {app.count}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <h1 className="uppercase heading-1">
            {getLabelByRoute(location.pathname)}
          </h1>
        )}
        <div className="flex gap-2">
          <IconButton variant="secondary" color="neutral" size="lg">
            <SolarNotificationBellIcon />
          </IconButton>
          <Avatar>
            <AvatarFallback>
              <IconButton
                className="p-2 py-[7.5px]"
                variant="secondary"
                color="neutral"
                size="lg"
              >
                <SolarUserRoundedIcon />
              </IconButton>
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};