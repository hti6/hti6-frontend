// import { IMaskInput } from "react-imask";
import {
  FC,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import { cn } from "@/shared/lib/utils";
import { SolarEyeIcon, SolarEyeClosedIcon, IconProps } from "@/shared/icons";
import { FunctionButton } from "../button";
// import { InputMask, MaskedDate } from "imask";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  withAsterisk?: boolean;
  Icon?: FC<IconProps>;
  IconStart?: FC<IconProps>;
  FullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      Icon,
      withAsterisk,
      className,
      type,
      IconStart,
      FullWidth,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          "transition duration-2xs relative",
          FullWidth && "w-full",
        )}
      >
        {IconStart && (
          <div className="absolute left-4 top-4">
            <IconStart />
          </div>
        )}
        <label
          className={cn(
            "select-none pointer-events-none transition duration-m absolute top-4 body-m text-fg-soft font-medium left-3",
            props.value &&
            placeholder &&
            "translate-y-[-8px] opacity-100 description-l",
            IconStart && "pl-10",
            className,
          )}
        >
          {placeholder}
          {withAsterisk && <span className="text-border-error">*</span>}
        </label>
        <input
          type={type}
          className={cn(
            "h-14",
            "transition duration-l px-3 py-[14.75px] bg-bg-surface2 w-full border-[1.5px] border-border-muted rounded-m text-fg body-m placeholder:text-transparent disabled:text-fg-disabled",
            props.value &&
            placeholder &&
            "placeholder:text-opacity-0 pt-[23.5px] pb-[5.5px]",
            Icon && "pr-12",
            IconStart && "pl-14",
            className,
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <div className="absolute right-4 top-4">
            <Icon />
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, withAsterisk, className, type = "password", ...props },
    ref,
  ) => {
    const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);
    return (
      <div className="transition duration-2xs relative">
        <label
          className={cn(
            "select-none pointer-events-none transition duration-l absolute text-fg-muted top-4 body-m font-medium left-3",
            props.value &&
            placeholder &&
            "translate-y-[-8px] opacity-100 description-l",
          )}
        >
          {placeholder}
          {withAsterisk && <span className="text-border-error">*</span>}
        </label>
        <input
          type={inputType}
          className={cn(
            "h-14",
            "transition duration-l px-3 py-[14.75px] bg-bg-surface2 w-full border-[1.5px] border-border-muted rounded-m text-fg body-m placeholder:text-transparent disabled:text-fg-disabled",
            props.value &&
            placeholder &&
            "placeholder:text-opacity-0 pt-[23.5px] pb-[6px]",
            className,
          )}
          ref={ref}
          {...props}
        />
        <FunctionButton
          className="absolute right-3 top-4"
          variant="tertiary"
          onClick={() =>
            setInputType((prev) => (prev === "text" ? "password" : "text"))
          }
        >
          {inputType == "text" && <SolarEyeIcon />}
          {inputType == "password" && <SolarEyeClosedIcon />}
        </FunctionButton>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

//interface MaskInputProps extends InputProps {
//  onAccept: (
//    value: InputMask<MaskedDate>["value"],
//    maskRef: InputMask<{ [x: string]: unknown }>,
//    e?: InputEvent | undefined,
//  ) => void;
//}
//
//const MaskInput = forwardRef<HTMLInputElement, MaskInputProps>(
//  ({ placeholder, Icon, withAsterisk, className, type, ...props }, ref) => {
//    return (
//      <div className="transition duration-100 relative">
//        <label
//          className={cn(
//            "select-none pointer-events-none transition duration-300 absolute text-content-tertiary top-4 text-base font-medium left-4",
//            props.value &&
//            placeholder &&
//            "translate-y-[-8px] opacity-100 text-content-primary text-xs",
//          )}
//        >
//          {placeholder}
//          {withAsterisk && <span className="text-border-error">*</span>}
//        </label>
//        <IMaskInput
//          mask={Date}
//          className={cn(
//            "transition duration-300 p-4 bg-background-secondary w-full outline outline-[1.5px] outline-border-secondary rounded-2xl text-content-primary text-base placeholder:text-transparent disabled:text-border-hover-overlay",
//            props.value &&
//            placeholder &&
//            "placeholder:text-opacity-0 pt-[26px] pb-[6px]",
//            Icon && "pr-12",
//            className,
//          )}
//          onAccept={props.onAccept}
//          ref={ref}
//          value={props.value as string}
//        />
//        {Icon && (
//          <div className="absolute right-4 top-4">
//            <PopoverTrigger>
//              <Icon />
//            </PopoverTrigger>
//          </div>
//        )}
//      </div>
//    );
//  },
//);
//MaskInput.displayName = "MaskInput";

export { Input, PasswordInput };
