import { LoginFeature } from "@/features/login";
import { FooterWidget } from "@/widgets/footer";
import { FC } from "react";

export const LoginPage: FC = () => {
  return (
    <main className="[&>footer]:px-8 [&>div]:flex-1 h-screen w-screen flex flex-col justify-center items-center">
      <LoginFeature />
      <FooterWidget />
    </main>
  );
};
