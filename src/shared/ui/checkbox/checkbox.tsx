import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/shared/lib/utils";
import { CheckSmall, RemoveSmall } from "@atomaro/icons";

interface CheckboxProps {
  size?: "md" | "sm";
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(({ className, checked, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "flex relative peer shrink-0 rounded-2xs border border-[1.5px] m-0.5 border-border-soft bg-bg-surface2",
      "data-[state=checked]:bg-accent data-[state=checked]:border-none",
      "hover:border-accent-soft data-[state=checked]:hover:bg-accent-hover",
      "disabled:bg-bg-surface2 disabled:border-none data-[state=checked]:disabled:bg-bg-disabled",
      "ring-offset-bg-page focus-visible:ring-offset-2 focus-visible:ring-4 focus-visible:ring-accent-container focus-visible:outline-none focus-visible:border-accent-soft data-[state=checked]:focus-visible:bg-accent-hover",
      size == "md" ? "h-5 w-5" : "h-4 w-4",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-current",
        "text-accent-on-accent [&>svg]:fill-current",
        "absolute -top-0.5 -left-0.5",
        props.disabled ? "text-fg-disabled" : "",
      )}
    >
      {checked == true && (
        <CheckSmall size={size == "md" ? 24 : size == "sm" ? 20 : 24} />
      )}
      {checked == "indeterminate" && (
        <RemoveSmall size={size == "md" ? 24 : size == "sm" ? 20 : 24} />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";

export { Checkbox };
