import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../styles/global";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
}) => {
  const getStatusStyle = () => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          backgroundColor: "rgba(245,158,11,0.15)",
          textColor: COLORS.warning,
        };

      case "confirmed":
        return {
          backgroundColor: "rgba(16,185,129,0.15)",
          textColor: COLORS.success,
        };

      case "completed":
        return {
          backgroundColor: "rgba(99,102,241,0.15)",
          textColor: COLORS.accent2,
        };

      case "cancelled":
        return {
          backgroundColor: "rgba(244,63,94,0.1)",
          textColor: COLORS.danger,
        };

      default:
        return {
          backgroundColor: COLORS.surface2,
          textColor: COLORS.text,
        };
    }
  };

  const stylesData = getStatusStyle();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: stylesData.backgroundColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: stylesData.textColor,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  text: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});