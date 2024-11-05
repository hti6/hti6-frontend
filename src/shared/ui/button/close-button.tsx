import { FC } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/shared/lib/utils";
import { CloseLarge, CloseSmall, CloseSmall16 } from "@atomaro/icons";

type CloseButtonSize = "lg" | "md" | "sm" | "xs" | "2xs";

interface CloseButtonProps extends Omit<ButtonProps, "size"> {
  size?: CloseButtonSize;
}

export const CloseButton: FC<CloseButtonProps> = ({
  className,
  variant = "secondary",
  color = "neutral",
  size = "lg",
  ...props
}) => {
  return (
    <Button
      className={cn(
        "[&>svg]:fill-current",
        size == "lg"
          ? "rounded-m p-3"
          : size == "md"
            ? "rounded-s p-2"
            : size == "sm"
              ? "rounded-xs p-0"
              : size == "xs"
                ? "rounded-2xs p-0.5"
                : size == "2xs"
                  ? "rounded-2xs p-0"
                  : "",
        className,
      )}
      size=""
      color={color}
      variant={variant}
      {...props}
    >
      {size == "sm" ? (
        <CloseSmall />
      ) : size == "xs" || size == "2xs" ? (
        <CloseSmall16 />
      ) : (
        <CloseLarge />
      )}
    </Button>
  );
};
