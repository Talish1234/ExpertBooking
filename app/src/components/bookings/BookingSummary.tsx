import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { formatDate } from "../../utils";
import { COLORS } from "../../styles/global";

interface Expert {
  name: string;
  hourlyRate: number;
}

interface BookingSummaryProps {
  expert: Expert;
  date: string;
  timeSlot: string;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  expert,
  date,
  timeSlot,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Expert</Text>
        <Text style={styles.valueBold}>
          {expert.name}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>
          {date ? formatDate(date) : "—"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Time</Text>
        <Text style={styles.value}>
          {timeSlot || "—"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rate</Text>
        <Text style={styles.value}>
          ₹{expert.hourlyRate}/hr
        </Text>
      </View>
    </View>
  );
};

export default BookingSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface2,
    borderRadius: 10,
    padding: 14,
    marginVertical: 16,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },

  label: {
    fontSize: 14,
    color: COLORS.muted,
  },

  value: {
    fontSize: 14,
    color: COLORS.text,
  },

  valueBold: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
  },
});