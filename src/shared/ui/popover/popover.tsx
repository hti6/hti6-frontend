import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/shared/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  pointer?: boolean;
}

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      pointer = true,
      align = "center",
      sideOffset = 16,
      side = undefined,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        side={side}
        className={cn(
          "relative z-popover w-[200px] shadow-bottom-l bg-bg-surface1 rounded-m p-3 outline-none data-[state=open]:animate-popover-enter data-[state=closed]:animate-popover-exit",
          pointer
            ? "before:absolute before:w-4 before:h-4 before:rotate-45 before:bg-bg-surface1 before:data-[side=top]:-bottom-2 before:data-[side=bottom]:-top-2 before:data-[side=right]:rounded-br-2xs before:data-[side=left]:rounded-br-2xs before:data-[side=top]:rounded-br-2xs before:data-[side=bottom]:rounded-br-2xs"
            : "",
          pointer
            ? `${[
              "before:data-[align=end]:data-[side=right]:-left-2 before:data-[align=end]:data-[side=right]:bottom-5",
              "before:data-[align=end]:data-[side=left]:-right-2 before:data-[align=end]:data-[side=left]:bottom-5",
              "before:data-[align=end]:data-[side=top]:right-5",
              "before:data-[align=end]:data-[side=bottom]:right-5",
              "before:data-[align=center]:data-[side=right]:-left-2 before:data-[align=center]:data-[side=right]:top-[50%] before:data-[align=center]:data-[side=right]:-translate-y-2",
              "before:data-[align=center]:data-[side=left]:-right-2 before:data-[align=center]:data-[side=left]:top-[50%] before:data-[align=center]:data-[side=left]:-translate-y-2",
              "before:data-[align=center]:data-[side=top]:right-[50%] before:data-[align=center]:data-[side=top]:translate-x-2",
              "before:data-[align=center]:data-[side=bottom]:right-[50%] before:data-[align=center]:data-[side=bottom]:translate-x-2",
              "before:data-[align=start]:data-[side=right]:-left-2 before:data-[align=start]:data-[side=right]:top-5",
              "before:data-[align=start]:data-[side=left]:-right-2 before:data-[align=start]:data-[side=left]:top-5",
              "before:data-[align=start]:data-[side=top]:left-5",
              "before:data-[align=start]:data-[side=bottom]:left-5",
            ].join(
              " ",
            )} before:data-[align=end]:data-[side=start]:-left-2 before:data-[align=start]:data-[side=right]:top-5`
            : "",
          //pointer
          //  ? (() => {
          //    switch (align) {
          //      case "end":
          //        return "before:data-[side=right]:-left-2 before:data-[side=right]:bottom-5 before:right-5";
          //      case "center":
          //        return "before:data-[side=right]:-left-2 before:data-[side=right]:top-[50%] before:data-[side=right]:-translate-y-2 before:data-[side=left]:-left-6 before:data-[side=bottom]:right-[50%] before:data-[side=bottom]:translate-x-2 before:data-[side=top]:right-[50%] before:data-[side=top]:translate-x-2";
          //      case "start":
          //        return "before:data-[side=right]:-left-2 before:data-[side=right]:top-5 before:left-5";
          //      default:
          //        return "";
          //    }
          //  })()
          //  : "",
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };
