import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { formatDate } from "../utils";
import { COLORS } from "../styles/global";

interface Booking {
  expertName: string;
  date: string;
  timeSlot: string;
  clientEmail: string;
}

interface BookingSuccessPageProps {
  booking: Booking;
  onHome: () => void;
  onMyBookings: () => void;
}

const BookingSuccessPage: React.FC<
  BookingSuccessPageProps
> = ({
  booking,
  onHome,
  onMyBookings,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>
        🎉
      </Text>

      <Text style={styles.title}>
        Booking Confirmed!
      </Text>

      <Text style={styles.message}>
        Your session with{" "}
        <Text style={styles.bold}>
          {booking.expertName}
        </Text>{" "}
        on{" "}
        <Text style={styles.bold}>
          {formatDate(booking.date)}
        </Text>{" "}
        at{" "}
        <Text style={styles.bold}>
          {booking.timeSlot}
        </Text>{" "}
        is confirmed. Confirmation sent
        to{" "}
        <Text style={styles.bold}>
          {booking.clientEmail}
        </Text>
        .
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.outlineButton}
          onPress={onHome}
        >
          <Text
            style={styles.outlineButtonText}
          >
            Browse more experts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={onMyBookings}
        >
          <Text
            style={styles.primaryButtonText}
          >
            View my bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSuccessPage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    margin: 20,
  },

  icon: {
    fontSize: 48,
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.success,
    marginBottom: 8,
    textAlign: "center",
  },

  message: {
    color: COLORS.muted,
    lineHeight: 24,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },

  bold: {
    color: COLORS.text,
    fontWeight: "700",
  },

  actions: {
    width: "100%",
    gap: 12,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  outlineButtonText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "600",
  },

  primaryButton: {
    backgroundColor: COLORS.accent2,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});