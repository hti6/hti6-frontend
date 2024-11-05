import { RouteIcon } from "@/shared/icons";
import { FunctionButton } from "@/shared/ui/button";
import { FC } from "react";

export const FooterWidget: FC = () => {
  return (
    <footer className="mt-2 w-full">
      <div className="py-6 flex justify-between">
        <span className="body-m text-fg-soft">
          © 2023 - 2024 ООО «СмартОм»
        </span>
        <nav className="flex gap-6">
          <FunctionButton size="body-m" weight="default" variant="tertiary">
            <RouteIcon /> Канал в Телеграм
          </FunctionButton>
          <FunctionButton size="body-m" weight="default" variant="tertiary">
            Правила участия
          </FunctionButton>
          <FunctionButton size="body-m" weight="default" variant="tertiary">
            Обратная связь
          </FunctionButton>
        </nav>
      </div>
    </footer>
  );
};
