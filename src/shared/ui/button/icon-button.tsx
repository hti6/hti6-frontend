import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/shared/lib/utils";

export const IconButton: FC<ButtonProps> = ({
  children,
  className,
  size = "xl",
  ...props
}) => {
  return (
    <Button
      className={cn(
        "[&>svg]:fill-current",
        size == "xl"
          ? "p-4"
          : size == "lg"
            ? "p-3"
            : size == "md"
              ? "[&>svg]:h-5 [&>svg]:w-5 p-2"
              : size == "sm"
                ? "[&>svg]:h-4 [&>svg]:w-4 p-1"
                : "",
        className,
      )}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};
