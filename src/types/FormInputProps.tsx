import { TextInputProps } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type FormInputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autoComplete?: TextInputProps["autoComplete"];
  error?: string;
  keyboardType?: TextInputProps["keyboardType"];
  theme?: "primary" | "secondary" | "tertiary" | "lime";
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
} & TextInputProps;

export default FormInputProps;
