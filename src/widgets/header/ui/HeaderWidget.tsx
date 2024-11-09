import {
  BoltIcon,
  SolarLogout,
  SolarNotificationBellIcon,
} from "@/shared/icons";
import { SolarUserRoundedIcon } from "@/shared/icons/solar-user-rounded";
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
import { AddLarge } from "@atomaro/icons";

function getLabelByRoute(route: string): string {
  switch (route) {
    case "/applications":
      return "заявки";
    case "/video":
      return "камеры";
    case "/map":
      return "карта";
    case "/admin":
      return "пользователи";
    default:
      return "Добро пожаловать в Нейро Портал!";
  }
}

export const HeaderWidget: FC = () => {
  const { logout, user, notifications } = useUser();
  const date = new Date(user?.created_at as string);
  const location = useLocation();
  return (
    <header className="mb-2">
      <div className="flex justify-between p-6 items-center rounded-b-l bg-bg-surface1">
        <h1 className="uppercase heading-1">
          {getLabelByRoute(location.pathname)}
        </h1>
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
              {notifications?.length === 0 || notifications == null ? (
                <div
                  className={
                    "flex flex-col gap-[32px] items-center justify-center w-full h-full"
                  }
                >
                  <img
                    src="/search-illustration.png"
                    width={"240px"}
                    height={"240px"}
                  />
                  <div
                    className={
                      "flex flex-col items-center justify-center gap-[16px]"
                    }
                  >
                    <p className={"font-heading text-[28px]"}>
                      У ВАС ПОКА НЕТ УВЕДОМЛЕНИЙ
                    </p>
                    <p className={"font-body text-[18px] text-[#93979F]"}>
                      Описание сценария
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={
                    "flex flex-col gap-2 px-[16px] h-full overflow-y-scroll"
                  }
                >
                  {notifications?.map((row) => (
                    <div
                      className={
                        "flex flex-col gap-[10px] bg-[#FAFAFB] rounded-[24px] p-[24px]"
                      }
                    >
                      <div className={"flex items-center gap-[4px]"}>
                        <div
                          className={
                            "rounded-[7px] p-[4px] flex justify-center items-center bg-[#F291001A] text-[#F29100] [&>svg]:fill-current"
                          }
                        >
                          <BoltIcon />
                        </div>
                        <div
                          className={
                            "bg-[#F291001A] rounded-[8px] py-[4px] px-[8px] flex justify-center items-center"
                          }
                        >
                          <p
                            className={
                              "font-display text-[12px] text-[#CE7B00]"
                            }
                          >
                            {row.id}
                          </p>
                        </div>
                      </div>
                      <p className={"font-heading"}>{row.title}</p>
                      <p className={"font-body"}>{row.content}</p>
                    </div>
                  ))}
                </div>
              )}
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
              <div className={"flex-1 p-4"}>
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
                    <div className={"flex items-center justify-between"}>
                      <div
                        className={"basis-1/2 flex flex-col py-[20px] w-full"}
                      >
                        <p className={"font-body text-[16px]"}>Ваше имя</p>
                        <p
                          className={
                            "font-description text-[#93979F] text-[12px]"
                          }
                        >
                          Используется для отображения
                        </p>
                      </div>
                      <div
                        className={
                          "basis-1/2 flex flex-col py-[8px] px-[12px] rounded-[16px] w-full border-[1.5px] border-[#595F6B0A] bg-[#FAFAFB]"
                        }
                      >
                        <label
                          className={
                            "text-[#93979F] text-[12px] font-description"
                          }
                          htmlFor="name"
                        >
                          Имя
                        </label>
                        <input
                          disabled
                          value={user?.name}
                          className={"bg-transparent"}
                          name="name"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className={"border-t-[1px] border-[#595F6B1A] py-[20px]"}
                  >
                    <div className={"flex items-start justify-between"}>
                      <div className={"basis-1/2 flex flex-col w-full"}>
                        <p className={"font-body text-[16px] text-[#121315]"}>
                          Электронная почта
                        </p>
                        <p className={"font-body text-[16px] text-[#121315]"}>
                          {user?.name}@mail.ru
                        </p>
                        <p
                          className={
                            "font-description text-[12px] text-[#93979F]"
                          }
                        >
                          Используется для входа,получения уведомлений и другой
                          важной информации
                        </p>
                      </div>
                      <div className={"basis-1/2 flex items-center w-full"}>
                        <IconButton
                          className={"bg-[#E22E65] h-[48px] items-center"}
                        >
                          <AddLarge />
                          Добавить почту
                        </IconButton>
                      </div>
                    </div>
                  </div>
                  <div
                    className={"border-t-[1px] border-[#595F6B1A] py-[20px]"}
                  >
                    <div className={"flex items-start justify-between"}>
                      <div className={"flex flex-col basis-1/2 w-full"}>
                        <p className={"font-body text-[16px] text-[#121315]"}>
                          Пароль
                        </p>
                        <p
                          className={
                            "font-description text-[12px] text-[#93979F]"
                          }
                        >
                          Изменен{" "}
                          {date.toLocaleString("ru-RU", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className={"basis-1/2 w-full"}>
                        <IconButton
                          variant={"outline"}
                          className={
                            "text-[#595F6B] outline-[#595F6B14] h-[48px] items-center"
                          }
                        >
                          <AddLarge />
                          Изменить пароль
                        </IconButton>
                      </div>
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};
