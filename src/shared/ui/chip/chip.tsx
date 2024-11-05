import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
} from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/shared/lib/utils";

type ChipVariant = "primary" | "secondary";

export interface ChipProps {
  variant?: ChipVariant;
  count?: number;
}

const Chip = forwardRef<
  ElementRef<typeof TogglePrimitive.Root>,
  ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & ChipProps
>(({ className, count, pressed, variant = "primary", ...props }, ref) => {
  useEffect(() => {
    console.log(pressed);
  }, [pressed]);
  return (
    <TogglePrimitive.Root
      className={cn(
        "group inline-flex gap-1 items-start justify-center rounded-full body-m py-1 px-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-container disabled:bg-bg-disabled disabled:text-fg-disabled ",
        variant == "primary"
          ? `bg-neutral-container hover:bg-neutral-container-hover focus-visible:bg-neutral-container-hover data-[state=on]:bg-accent data-[state=on]:text-accent-on-accent data-[state=on]:hover:bg-accent-hover data-[state=on]:focus-visible:bg-accent-hover data-[state=on]:disabled:bg-accent-container`
          : variant == "secondary"
            ? `bg-transparent outline outline-[1.5px] outline-offset-[-1.5px] outline-border-soft hover:outline-accent-soft focus-visible:outline-accent-soft data-[state=on]:outline-accent data-[state=on]:hover:outline-accent-hover data-[state=on]:focus-visible:outline-accent-hover data-[state=on]:disabled:outline-accent-container`
            : "",
        "[&>svg]:fill-current",
        className,
      )}
      ref={ref}
      {...props}
    >
      {props.children}
      {count != undefined && (
        <span
          className={cn(
            "text-fg h-full description-l",
            variant == "primary"
              ? "group-data-[state=on]:text-accent-on-accent"
              : "",
          )}
        >
          {count}
        </span>
      )}
    </TogglePrimitive.Root>
  );
});
Chip.displayName = "Chip";

export { Chip };
