import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { cn } from "@/utils/cn";
import { AppText } from "@/components/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import formInputProps from "@/types/FormInputProps";

const FormInput: React.FC<formInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  error,
  theme = "primary",
  numberOfLines = 1,
  multiline,
  icon,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && (
        <Text
          className={cn(
            theme === "secondary" && "text-black mb-2",
            theme === "primary" && "text-white mb-2",
            theme === "tertiary" && "text-gray-800 mb-2",
            theme === "lime" && "text-black mb-2",
          )}
        >
          {label}
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            error && styles.errorInput,
            multiline && { minHeight: numberOfLines * 24 },
            rest?.style,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !multiline}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          placeholderTextColor="#fff"
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...rest}
        />
        {icon && <MaterialIcons name="search" size={25} color="#fff" />}
      </View>
      {error && <AppText color="danger">{error}</AppText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 16,
    paddingVertical: 10,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "red",
  },
});

export default FormInput;
