import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { DefaultColor } from "@/shared/types/default-colors";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonColors = DefaultColor;
export type ButtonSize = "xl" | "lg" | "md" | "sm" | "";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColors;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      color = "accent",
      size = "xl",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "flex gap-1",
          // ring-offset-<color>. Ты можешь поменять в className под тот фон, под которым находится кнопка
          // по умолчанию стоит ring-offset-bg-page
          "focus-visible:outline-none disabled:pointer-events-none disabled:bg-bg-disabled disabled:text-fg-disabled focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-accent-container ring-offset-bg-page",
          (() => {
            switch (variant) {
              case "primary":
                return `bg-${color} text-${color}-on-${color} hover:bg-${color}-hover focus-visible:bg-${color}-hover`;
              case "secondary":
                return `bg-${color}-container text-${color}-on-container hover:bg-${color}-container-hover hover:text-${color}-hover focus-visible:bg-${color}-container-hover focus-visible:text-${color}-hover`;
              case "outline":
                return `bg-transparent outline outline-[1.5px] outline-offset-[-1.5px] outline-${color}-muted hover:outline-${color}-soft hover:bg-${color}-container focus-visible:bg-${color}-container text-${color}-on-container focus-visible:text-${color}-hover focus-visible:outline-${color}-soft hover:text-${color}-hover focus-visible:outline disabled:outline-bg-disabled disabled:bg-transparent`;
              case "ghost":
                return `text-${color}-on-container bg-transparent hover:bg-${color}-container hover:text-${color}-hover focus-visible:bg-${color}-container focus-visible:text-${color}-hover disabled:bg-transparent`;
            }
          })(),
          (() => {
            switch (size) {
              case "xl":
                return `rounded-m py-4 px-6 body-m-strong`;
              case "lg":
                return `rounded-m py-3 px-5 body-m-strong`;
              case "md":
                return `rounded-s py-2 px-4 body-s-strong`;
              case "sm":
                return `rounded-xs py-1 px-3 description-l-strong`;
              default:
                return "";
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
Button.displayName = "Button";

export { Button };
