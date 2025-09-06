import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import formInputProps from "@/app/types/FormInputProps";
import { cn } from "@/utils/cn";

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
          style={[styles.input, error && styles.errorInput]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
    width: "95%",
  },
  label: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  input: {
    height: 46,
    flex: 1,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default FormInput;
