import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "@/utils/cn";
import { AppText } from "@/components/AppText";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/Constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

type DatePickerFieldProps = {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
  error?: string;
  theme?: "primary" | "secondary" | "tertiary" | "lime";
  customStyle?: object;
  editable?: boolean;
  disabled?: boolean;
  mode?: "date" | "time" | "datetime";
  minimumDate?: Date;
  maximumDate?: Date;
  displayFormat?: "short" | "long" | "numeric";
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "Select a date",
  error,
  theme = "primary",
  customStyle = { borderColor: Colors.tertiary },
  editable = true,
  disabled = false,
  mode = "date",
  minimumDate,
  maximumDate,
  displayFormat = "long",
}) => {
  const [show, setShow] = useState(false);

  const isDisabled = !editable || disabled;

  const formatDate = (date: Date): string => {
    if (!date) return placeholder;

    const options: Intl.DateTimeFormatOptions =
      displayFormat === "short"
        ? { month: "short", day: "numeric", year: "numeric" }
        : displayFormat === "numeric"
          ? { month: "2-digit", day: "2-digit", year: "numeric" }
          : { month: "long", day: "numeric", year: "numeric" };

    if (mode === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (mode === "datetime") {
      return date.toLocaleString("en-US", {
        ...options,
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", options);
  };

  const handleChange = (event: any, selectedDate?: Date) => {
    // On Android, modal closes automatically
    if (Platform.OS === "android") {
      setShow(false);
    }

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handlePress = () => {
    if (!isDisabled) {
      setShow(true);
    }
  };

  const handleCancel = () => {
    setShow(false);
  };

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

      <TouchableOpacity
        style={[
          styles.dateButton,
          customStyle,
          error && styles.errorInput,
          isDisabled && styles.disabledInput,
        ]}
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        <Text style={[styles.dateText, !value && styles.placeholderText]}>
          {formatDate(value)}
        </Text>
        <MaterialIcons
          name={
            mode === "time"
              ? "access-time"
              : mode === "datetime"
                ? "event-note"
                : "calendar-today"
          }
          size={20}
          color={isDisabled ? "#666" : "#818281"}
        />
      </TouchableOpacity>

      {error && <AppText color="danger">{error}</AppText>}

      {show && (
        <>
          {Platform.OS === "ios" && (
            <View style={styles.iosPickerContainer}>
              <View style={styles.iosPickerHeader}>
                <TouchableOpacity onPress={handleCancel}>
                  <Text style={styles.iosButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShow(false)}>
                  <Text style={[styles.iosButtonText, styles.doneButton]}>
                    Done
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={value || new Date()}
                mode={mode}
                display="spinner"
                onChange={handleChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                themeVariant="dark"
                textColor="#fff"
              />
            </View>
          )}

          {Platform.OS === "android" && (
            <DateTimePicker
              value={value || new Date()}
              mode={mode}
              display="default"
              onChange={handleChange}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "transparent",
    minHeight: 48,
  },
  dateText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  placeholderText: {
    color: "#818281",
  },
  errorInput: {
    borderColor: "red",
  },
  disabledInput: {
    opacity: 0.5,
    backgroundColor: "#1a1a1a",
  },
  iosPickerContainer: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    marginTop: 8,
    overflow: "hidden",
  },
  iosPickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  iosButtonText: {
    fontSize: 16,
    color: "#818281",
  },
  doneButton: {
    color: "#4ade80",
    fontWeight: "600",
  },
});

export default DatePickerField;
