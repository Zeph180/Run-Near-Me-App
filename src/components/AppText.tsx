import { Text } from "react-native";
import { cn } from "../utils/cn";

type AppTextProps = {
  children: React.ReactNode;
  size?: "small" | "medium" | "large" | "heading" | "xl" | "xxl";
  bold?: boolean;
  color?: "primary" | "secondary" | "tertiary" | "white" | "lime";
  center?: boolean;
  className?: string;
};

export function AppText({
  children,
  size = "medium",
  bold = false,
  color = "white",
  center = false,
  className,
}: AppTextProps) {
  return (
    <Text
      className={cn(
        size === "small" && "text-sm mb-2",
        size === "medium" && "text-base mb-3",
        size === "large" && "text-lg mb-4",
        size === "xl" && "text-xl mb-4",
        size === "xxl" && "text-3xl mb-3",
        size === "heading" && "text-xl mb-5",
        bold && "font-bold",
        color === "primary" && "text-black",
        color === "secondary" && "text-gray-500",
        color === "tertiary" && "text-gray-400",
        color === "white" && "text-white",
        color === "lime" && "#a4ff53",
        center && "text-center",
        className,
      )}
    >
      {children}
    </Text>
  );
}
