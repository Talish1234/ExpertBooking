import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { formatDate } from "../../utils";
import { COLORS } from "../../styles/global";

interface DaySlots {
  date: string;
  slots: string[];
}

interface BookedSlots {
  [key: string]: boolean;
}

interface TimeSlotsProps {
  availableSlots?: DaySlots[];
  bookedSlots: BookedSlots;
  selectedDate: string;
  selectedSlot: string;
  onSelect: (date: string, slot: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  availableSlots = [],
  bookedSlots,
  selectedDate,
  selectedSlot,
  onSelect,
}) => {
  const isBooked = (date: string, slot: string) => {
    return !!bookedSlots[`${date}_${slot}`];
  };

  if (availableSlots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No available slots at this time.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Available Time Slots
        </Text>

        <View style={styles.liveBadge}>
          <View style={styles.pulseDot} />

          <Text style={styles.liveText}>
            Live updates
          </Text>
        </View>
      </View>

      {availableSlots.map((day) => (
        <View
          key={day.date}
          style={styles.dateGroup}
        >
          <Text style={styles.dateLabel}>
            {formatDate(day.date)}
          </Text>

          <View style={styles.slotsRow}>
            {day.slots.map((slot) => {
              const booked = isBooked(day.date, slot);

              const selected =
                selectedDate === day.date &&
                selectedSlot === slot;

              return (
                <TouchableOpacity
                  key={slot}
                  disabled={booked}
                  onPress={() =>
                    onSelect(day.date, slot)
                  }
                  style={[
                    styles.slotButton,

                    booked &&
                      styles.slotButtonBooked,

                    selected &&
                      styles.slotButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.slotText,

                      booked &&
                        styles.slotTextBooked,

                      selected &&
                        styles.slotTextSelected,
                    ]}
                  >
                    {slot}
                    {booked ? " ✕" : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
    </View>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginRight: 12,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
  },

  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },

  liveText: {
    fontSize: 12,
    color: COLORS.success,
  },

  dateGroup: {
    marginBottom: 20,
  },

  dateLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.muted,
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  slotsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  slotButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  slotButtonBooked: {
    backgroundColor: "rgba(244,63,94,0.08)",
    borderColor: "rgba(244,63,94,0.3)",
  },

  slotButtonSelected: {
    backgroundColor: "rgba(167,139,250,0.15)",
    borderColor: COLORS.accent,
  },

  slotText: {
    fontSize: 14,
    color: COLORS.text,
  },

  slotTextBooked: {
    color: COLORS.muted,
    textDecorationLine: "line-through",
  },

  slotTextSelected: {
    color: COLORS.accent,
    fontWeight: "600",
  },

  emptyContainer: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.muted,
    fontSize: 14,
    textAlign: "center",
  },
});