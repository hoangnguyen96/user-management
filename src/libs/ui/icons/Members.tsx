import { IconProps } from "@app/models";

export const Members: React.FC<IconProps> = ({
  width = "40px",
  height = "40px",
  color = "#00ac4f",
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.0666 31.75L26.6 34.2834L31.6666 29.2167"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.2669 18.117C20.1003 18.1003 19.9003 18.1003 19.7169 18.117C15.7503 17.9837 12.6003 14.7337 12.6003 10.7337C12.5836 6.65035 15.9003 3.33368 19.9836 3.33368C24.0669 3.33368 27.3836 6.65035 27.3836 10.7337C27.3836 14.7337 24.2169 17.9837 20.2669 18.117Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.9831 36.3498C16.9498 36.3498 13.9331 35.5832 11.6331 34.0498C7.59981 31.3498 7.59981 26.9498 11.6331 24.2665C16.2165 21.1998 23.7331 21.1998 28.3165 24.2665"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
