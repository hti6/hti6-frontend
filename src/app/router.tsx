import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts";
import { HomePage } from "@/pages/home";

export const Router: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
        <Route path="/login">
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
