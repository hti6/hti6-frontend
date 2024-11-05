import { FC } from "react";
import { IconProps } from ".";

export const SolarUserRoundedIcon: FC<IconProps> = ({
  width = 32,
  height = 33,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 33"
    >
      <circle cx="16" cy="8.5" r="5.333"></circle>
      <ellipse cx="16" cy="23.167" rx="9.333" ry="5.333"></ellipse>
    </svg>
  );
};
