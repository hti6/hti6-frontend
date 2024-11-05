import { SolarNotificationBellIcon } from "@/shared/icons";
import { SolarUserRoundedIcon } from "@/shared/icons/solar-user-rounded";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { IconButton } from "@/shared/ui/button";
import { FC } from "react";

export const HeaderWidget: FC = () => {
  return (
    <header className="mb-2">
      <div className="flex justify-between p-6 rounded-b-l bg-bg-surface1">
        <h1 className="uppercase heading-1">
          Добро пожаловать в Нейро Портал!
        </h1>
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
