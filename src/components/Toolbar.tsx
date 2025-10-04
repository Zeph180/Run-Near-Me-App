import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

function ToolbarButton({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  const iconMap: Record<string, React.ReactNode> = {
    image: <MaterialIcons name="image" size={24} color="#444" />,
    gif: <FontAwesome5 name="file-video" size={22} color="#444" />,
    checklist: <MaterialIcons name="checklist" size={24} color="#444" />,
    newspaper: <MaterialIcons name="article" size={24} color="#444" />,
    inbox: <MaterialIcons name="inbox" size={24} color="#444" />,
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.toolbarButton}>
      {iconMap[icon]}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toolbarButton: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    minWidth: 60,
  },
});
