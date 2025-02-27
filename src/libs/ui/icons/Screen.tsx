import { IconProps } from "@app/models";

export const Screen: React.FC<IconProps> = ({
  width = "42px",
  height = "42px",
  color = "#00ac4f",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.27 3.5H30.7125C36.9425 3.5 38.5 5.0575 38.5 11.27V22.3475C38.5 28.5775 36.9425 30.1175 30.73 30.1175H11.27C5.0575 30.135 3.5 28.5775 3.5 22.365V11.27C3.5 5.0575 5.0575 3.5 11.27 3.5Z"
      stroke={color}
      strokeWidth="2.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 30.1345V38.4995"
      stroke={color}
      strokeWidth="2.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 22.75H38.5"
      stroke={color}
      strokeWidth="2.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.125 38.5H28.875"
      stroke={color}
      strokeWidth="2.625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
