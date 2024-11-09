import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage } from "@/pages/home";
import { LoginPage } from "@/pages/login";
import { ApplicationsPage } from "@/pages/applications";
import { VideoPage } from "@/pages/video/ui/VideoPage.tsx";
import { MapPage } from "@/pages/map";
import { AdminPage } from "@/pages/admin";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
        <Route path="/login">
          <Route index element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
