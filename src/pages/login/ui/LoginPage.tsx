import { Input, PasswordInput } from "@/shared/ui/input/input";
import { Segment } from "@/shared/ui/segmented-control";
import { FC, useState } from "react";

export const LoginPage: FC = () => {
  const [login, setLogin] = useState("");
  return (
    <main>
      <div className="w-[400px] h-[500px] bg-bg-surface1">
        <div className="flex flex-col gap-2">
          <Input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
          />
          <PasswordInput
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Логин"
          />
          <Segment disabled variant="primary">
            hey
          </Segment>
        </div>
      </div>
    </main>
  );
};
