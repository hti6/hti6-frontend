import { IconProps, MainIcon } from "@/shared/icons";
import { MapArrowIcon } from "@/shared/icons/map-arrow";
import { NotesIcon } from "@/shared/icons/notes";
import { VideoCameraIcon } from "@/shared/icons/video-camera";
import { FC } from "react";

interface SidebarLink {
  label: string;
  href: string;
  Icon: FC<IconProps>;
}

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Главная",
    href: "/",
    Icon: MainIcon,
  },
  {
    label: "Заявки",
    href: "/requests",
    Icon: NotesIcon,
  },
  {
    label: "Камеры",
    href: "/video",
    Icon: VideoCameraIcon,
  },
  {
    label: "Карта",
    href: "/map",
    Icon: MapArrowIcon,
  },
];
