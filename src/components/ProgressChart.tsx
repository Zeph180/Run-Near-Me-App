import React from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import { AppText } from "@/components/AppText";

type Props = {
  title: string;
  subtitle: string;
  data: number[];
  labels: string[];
  selectedRange: string;
  onRangeChange: (value: string) => void;
};

const screenWidth = Dimensions.get("window").width;

export const ProgressChart: React.FC<Props> = ({
  title,
  subtitle,
  data,
  labels,
  selectedRange,
  onRangeChange,
}) => {
  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        <View style={styles.textGroup}>
          <AppText className="mb-0" size="xl">
            {title}
          </AppText>
          <AppText>{subtitle}</AppText>
        </View>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedRange}
            onValueChange={onRangeChange}
            style={styles.picker}
            dropdownIconColor="#a4ff53"
            mode={Platform.OS === "ios" ? "dialog" : "dropdown"}
          >
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Monthly" value="Monthly" />
          </Picker>
        </View>
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels,
          datasets: [{ data }],
        }}
        width={screenWidth - 32}
        height={220}
        withDots
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          decimalPlaces: 0,
          color: () => "#a4ff53",
          labelColor: () => "#ffffff",
          propsForDots: {
            r: "4",
            strokeWidth: "3",
            stroke: "#a4ff53",
            fill: "#0e0e0e",
          },
          propsForBackgroundLines: {
            stroke: "#444",
            strokeDasharray: "4",
          },
        }}
        bezier
        style={{}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "flex-start",
  },
  textGroup: {
    flex: 1,
  },
  pickerWrapper: {
    width: 120,
  },
  picker: {
    color: "#a4ff53",
  },
});
