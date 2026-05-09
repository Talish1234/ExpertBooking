import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { StatusBadge } from "../common";
import { formatDate } from "../../utils";
import globalStyles, { COLORS } from "../../styles/global";

interface Booking {
  expertName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: string;
}

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <View style={styles.bookingCard}>
      <View style={styles.bookingInfo}>
        <Text style={styles.title}>
          {booking.expertName}
        </Text>

        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>
            📅 {formatDate(booking.date)} at {booking.timeSlot}
          </Text>

          {booking.notes ? (
            <Text style={styles.metaText}>
              📝 {booking.notes}
            </Text>
          ) : null}

          <Text style={styles.bookedText}>
            Booked{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <StatusBadge status={booking.status} />
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  bookingCard: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 20,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },

  bookingInfo: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },

  metaContainer: {
    gap: 4,
  },

  metaText: {
    fontSize: 13,
    color: COLORS.muted,
  },

  bookedText: {
    fontSize: 12,
    color: COLORS.muted,
    opacity: 0.6,
    marginTop: 4,
  },
});