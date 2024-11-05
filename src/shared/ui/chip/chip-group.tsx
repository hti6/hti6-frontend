import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { createContext, forwardRef, useContext } from "react";
import { ChipProps } from "./chip";
import { cn } from "@/shared/lib/utils";

const ChipGroupContext = createContext<ChipProps>({
  variant: "primary",
});

const ChipGroup = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ChipProps
>(({ className, variant = "primary", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-start justify-start gap-3 flex-wrap", className)}
    {...props}
  >
    <ChipGroupContext.Provider value={{ variant }}>
      {children}
    </ChipGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ChipGroup.displayName = "ChipGroup";

const ChipGroupItem = forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & ChipProps
>(({ className, children, count, variant, ...props }, ref) => {
  const context = useContext(ChipGroupContext);

  const chipVariant = context.variant || variant;

  console.log(chipVariant);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        "group inline-flex gap-1 items-start justify-center rounded-full body-m py-1 px-3 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent-container disabled:bg-bg-disabled disabled:text-fg-disabled ",
        chipVariant == "primary"
          ? `bg-neutral-container hover:bg-neutral-container-hover focus-visible:bg-neutral-container-hover data-[state=on]:bg-accent data-[state=on]:text-accent-on-accent data-[state=on]:hover:bg-accent-hover data-[state=on]:focus-visible:bg-accent-hover data-[state=on]:disabled:bg-accent-container`
          : chipVariant == "secondary"
            ? `bg-transparent outline outline-[1.5px] outline-offset-[-1.5px] outline-border-soft hover:outline-accent-soft focus-visible:outline-accent-soft data-[state=on]:outline-accent data-[state=on]:hover:outline-accent-hover data-[state=on]:focus-visible:outline-accent-hover data-[state=on]:disabled:outline-accent-container`
            : "",
        className,
      )}
      {...props}
    >
      {children}
      {count != undefined && (
        <span
          className={cn(
            "text-fg h-full description-l",
            chipVariant == "primary"
              ? "group-data-[state=on]:text-accent-on-accent"
              : "",
          )}
        >
          {count}
        </span>
      )}
    </ToggleGroupPrimitive.Item>
  );
});

ChipGroupItem.displayName = "ChipGroupItem";

export { ChipGroup, ChipGroupItem };
