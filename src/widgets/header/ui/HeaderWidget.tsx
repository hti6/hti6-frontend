import { SolarLogout, SolarNotificationBellIcon } from "@/shared/icons";
import { SolarUserRoundedIcon } from "@/shared/icons/solar-user-rounded";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button, IconButton } from "@/shared/ui/button";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useUser } from "@/app/providers";

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
  const { logout, user } = useUser();
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
          <Dialog>
            <DialogTrigger asChild>
              <IconButton variant="secondary" color="neutral" size="lg">
                <SolarNotificationBellIcon />
              </IconButton>
            </DialogTrigger>
            <DialogContent full>
              <DialogHeader full>
                <DialogTitle full>
                  нейро <span className="text-accent">уведомления</span>
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1">hey</div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent full>
              <DialogHeader full>
                <DialogTitle full>
                  нейро <span className="text-accent">профиль</span>
                </DialogTitle>
              </DialogHeader>
              <div className={"flex-1 p-4 divide-y"}>
                <div className={"flex gap-4 pb-[32px]"}>
                  <div
                    className={
                      "flex items-center justify-center rounded-[24px] bg-[#F7F7F8] text-[#595F6B] [&>svg]:fill-current w-[96px] h-[96px]"
                    }
                  >
                    <SolarUserRoundedIcon width={64} height={64} />
                  </div>
                  <div className={"flex flex-col"}>
                    <p className={"text-[28px] font-heading"}>{user?.name}</p>
                  </div>
                </div>
                <div className={"border-t-[1px] border-[#595F6B1A]"}>
                  <div className={"flex flex-col py-[20px]"}>
                    <p className={"font-body text-[16px]"}>Ваше имя</p>
                    <p
                      className={"font-description text-[#93979F] text-[12px]"}
                    >
                      Используется для входа по логину
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>

              <div className={"p-4"}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className={"text-[#E22E65] [&>svg]:fill-current"}
                      variant={"secondary"}
                    >
                      <SolarLogout /> Выйти из аккаунта
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>хотите выйти?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex justify-center">
                      <img src="/exit-illustration.png" />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <Button color="neutral" variant="secondary">
                          Отменить
                        </Button>
                      </AlertDialogCancel>
                      <AlertDialogAction asChild>
                        <Button onClick={logout}>Выйти</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
