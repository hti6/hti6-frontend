import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/shared/lib/utils";
import { CloseButton } from "../button";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-modal bg-neutral-container-active data-[state=open]:animate-overlay-enter data-[state=closed]:animate-overlay-exit",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps {
  full?: boolean;
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> &
  DialogContentProps
>(({ className, children, full = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-modal flex flex-col justify-between w-full bg-bg-surface1 rounded-l",
        full
          ? "gap-4 h-[calc(100vh-2rem)] max-w-[800px] right-4 top-4 p-2 data-[state=open]:animate-dialog-enter-full data-[state=closed]:animate-dialog-exit-full"
          : "gap-6 left-[50%] top-[50%] max-w-lg translate-x-[-50%] translate-y-[-50%] p-6 data-[state=open]:animate-dialog-enter data-[state=closed]:animate-dialog-exit",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close asChild className="absolute right-6 top-6">
        <CloseButton size={full ? "lg" : "md"} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface DialogHeaderProps {
  full?: boolean;
}
const DialogHeader = ({
  className,
  full,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & DialogHeaderProps) => (
  <div
    className={cn(
      full
        ? "h-[80px] flex items-center px-4 py-[18px]"
        : "flex flex-col text-left gap-2",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

interface DialogFooterProps {
  full?: boolean;
}
const DialogFooter = ({
  full,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & DialogFooterProps) => (
  <div
    className={cn(
      full
        ? "flex [&>button]:w-full [&>button]:justify-center gap-[10px] p-2"
        : "flex gap-4 flex-col [&>button]:justify-center",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

interface DialogTitleProps {
  full?: boolean;
}
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> &
  DialogTitleProps
>(({ full, className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      full ? "uppercase display-s-strong" : "uppercase heading-1",
      className,
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("body-s text-fg-soft", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
