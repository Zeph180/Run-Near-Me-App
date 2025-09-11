import { Text, TextStyle } from "react-native";
import { cn } from "../utils/cn";

type AppTextProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "heading" | "xl" | "xxl";
  bold?: boolean;
  color?: "primary" | "secondary" | "tertiary" | "white" | "lime" | "offWhite";
  center?: boolean;
  className?: string;
};

const colorMap: Record<NonNullable<AppTextProps["color"]>, string> = {
  primary: "#000000",
  secondary: "#6b7280",
  tertiary: "#9ca3af",
  white: "#ffffff",
  lime: "#a4ff53",
  offWhite: "#d9d9d9",
};

export function AppText({
  children,
  size = "medium",
  bold = false,
  color = "offWhite",
  center = false,
  className,
}: AppTextProps) {
  const textColorStyle: TextStyle = {
    color: colorMap[color],
  };

  return (
    <Text
      className={cn(
        size === "small" && "text-sm mb-2",
        size === "medium" && "text-base mb-3",
        size === "large" && "text-lg mb-4",
        size === "xl" && "text-xl mb-4",
        size === "xxl" && "text-3xl mb-3",
        size === "heading" && "text-xl mb-3",
        bold && "font-bold",
        center && "text-center",
        className,
      )}
      style={textColorStyle}
    >
      {children}
    </Text>
  );
}
