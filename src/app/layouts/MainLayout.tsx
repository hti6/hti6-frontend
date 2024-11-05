import { FooterWidget } from "@/widgets/footer";
import { HeaderWidget } from "@/widgets/header";
import { SidebarWidget } from "@/widgets/sidebar";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  return (
    <div className="flex w-screen">
      <SidebarWidget />
      <main className="w-full flex flex-col justify-between h-screen pr-4">
        <HeaderWidget />
        <div className="w-full h-full">
          <Outlet />
        </div>
        <FooterWidget />
      </main>
    </div>
  );
};
