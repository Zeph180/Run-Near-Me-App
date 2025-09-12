import { MaterialCommunityIcons } from "@expo/vector-icons";

export type FameCardVerticalProps = {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  value: number | string;
  label: string;
  color?: string;
  labelPosition?: "top" | "bottom";
  unit?: string;
};

export default FameCardVerticalProps;
