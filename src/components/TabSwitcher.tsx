import React, { useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText } from "@/components/AppText";

type TabProps = {
  id?: string;
  label: string;
  content: React.ReactNode;
};

type TabSwitcherProps = {
  tabs: TabProps[];
  initialTab?: number;
  onTabChange?: (index: number, tab: TabProps) => void;
  tabBarStyle?: any;
  tabTextStyle?: any;
  activeTabTextStyle?: any;
  indicatorStyle?: any;
  contentStyle?: any;
};

const TabSwitcher = ({
  tabs = [],
  initialTab = 0,
  onTabChange,
  tabBarStyle,
  tabTextStyle,
  activeTabTextStyle,
  indicatorStyle,
  contentStyle,
}: TabSwitcherProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [indicatorAnim] = useState(new Animated.Value(initialTab));

  useEffect(() => {
    if (initialTab !== activeTab) {
      setActiveTab(initialTab);
      Animated.spring(indicatorAnim, {
        toValue: initialTab,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [initialTab]);

  const handleTabPress = (index: any) => {
    if (index === activeTab) return;

    setActiveTab(index);
    onTabChange?.(index, tabs[index]);

    Animated.spring(indicatorAnim, {
      toValue: index,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start();
  };

  if (!tabs || tabs.length === 0) {
    return (
      <View style={[styles.container, contentStyle]}>
        <Text style={styles.emptyState}>No tabs provided</Text>
      </View>
    );
  }

  const tabWidth = 100 / tabs.length;

  return (
    <View style={[styles.container, contentStyle]}>
      {/* Tab Header */}
      <View style={[styles.tabHeader, tabBarStyle]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id || index}
            style={[styles.tabButton, { flex: 1 }]}
            onPress={() => handleTabPress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                tabTextStyle,
                activeTab === index && styles.activeTabText,
                activeTab === index && activeTabTextStyle,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Animated Indicator */}
      <View style={styles.indicatorContainer}>
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            {
              width: `${tabWidth}%`,
              left: indicatorAnim.interpolate({
                inputRange: tabs.map((_, i) => i),
                outputRange: tabs.map((_, i) => `${i * tabWidth}%`),
              }),
            },
          ]}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {tabs[activeTab]?.content || (
          <View style={styles.emptyContent}>
            <AppText>No content available</AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabHeader: {
    flexDirection: "row",
    paddingVertical: 5,
    backgroundColor: "transparent",
    paddingHorizontal: 8,
  },
  tabButton: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#888888",
  },
  activeTabText: {
    color: "#ffffff",
  },
  indicatorContainer: {
    backgroundColor: "#2a2a2a",
    height: 2,
    position: "relative",
  },
  indicator: {
    position: "absolute",
    height: 2,
    backgroundColor: "#4CAF50",
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#888888",
  },
  emptyContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabSwitcher;
