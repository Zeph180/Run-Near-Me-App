import React, { useState } from "react";
import Colors from "@/Constants/Colors";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "@/utils/cn";
import { MaterialIcons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  error?: string;
  theme?: "primary" | "secondary" | "tertiary" | "lime";
  customStyle?: object;
  editable?: boolean;
  disabled?: boolean;
}

const DropDownSelector: React.FC<DropdownFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  theme = "primary",
  customStyle = { borderColor: Colors.tertiary },
  editable = true,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const isDisabled = disabled || !disabled;

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
          styles.dropdownButton,
          customStyle,
          error && styles.errorInput,
          disabled && styles.disabledInput,
        ]}
        onPress={() => setIsOpen(true)}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dropdownText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {displayText}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={isDisabled ? "#666" : "#818281"}
        />
      </TouchableOpacity>
      {error && <AppText color="danger">{error}</AppText>}

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label || "Select Option"}</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <MaterialIcons name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {item.value === value && (
                    <MaterialIcons name="check" size={20} color="#4ade80" />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "transparent",
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 16,
    color: "#fff",
    flex: 1,
  },
  placeholderText: {
    color: Colors.tertiary,
  },
  errorInput: {
    borderColor: Colors.danger,
  },
  disabledInput: {
    opacity: 0.5,
    backgroundColor: "#1a1a1a",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    borderRadius: 12,
    width: "85%",
    maxHeight: "70%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  selectedOption: {
    backgroundColor: "#2a2a2a",
  },
  optionText: {
    fontSize: 16,
    color: "#fff",
  },
  separator: {
    height: 1,
    backgroundColor: "#333",
  },
});

export default DropDownSelector;
