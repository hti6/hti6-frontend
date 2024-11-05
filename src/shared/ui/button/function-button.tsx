import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type TextSize = "body-m" | "body-s";
export type TextWeight = "strong" | "default";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: TextSize;
  weight?: TextWeight;
  asChild?: boolean;
}

const FunctionButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "body-s",
      weight = "strong",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "flex gap-1 items-center",
          "rounded-xs",
          "py-0.5 [&:has(svg)]:py-0",
          "[&>svg]:fill-current",
          size == "body-s" && weight == "strong"
            ? "body-s-strong"
            : size == "body-s" && weight == "default"
              ? "body-s"
              : size == "body-m" && weight == "strong"
                ? "body-m-strong"
                : "body-m",
          // ring-offset-<color>. Ты можешь поменять в className под тот фон, под которым находится кнопка
          // по умолчанию стоит ring-offset-bg-page
          "focus-visible:outline-none disabled:pointer-events-none disabled:text-fg-disabled focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent-container ring-offset-bg-page",
          (() => {
            switch (variant) {
              case "primary":
                return `text-accent hover:text-accent-hover focus-visible:text-accent-hover`;
              case "secondary":
                return `text-fg hover:text-accent-hover focus-visible:text-accent-hover`;
              case "tertiary":
                return `text-fg-soft hover:text-accent-hover focus-visible:text-accent-hover`;
            }
          })(),
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
FunctionButton.displayName = "FunctionButton";

export { FunctionButton };
