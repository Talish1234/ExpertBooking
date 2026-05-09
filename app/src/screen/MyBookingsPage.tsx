import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Keyboard,
} from "react-native";

import { API_BASE } from "../config";
import BookingCard from "../components/bookings/BookingCard";
import globalStyles from "../styles/global";
import {COLORS} from "../styles/global";  
interface Booking {
  _id: string;
  expertName: string;
  date: string;
  timeSlot: string;
  createdAt: string;
  status: string;

  expertImage?: string;
  userName?: string;
  email?: string;
  notes?: string;
}

interface ApiResponse {
  data: Booking[];
}

const MyBookingsPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);

  const search = async () => {
    Keyboard.dismiss();

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");
    setSearched(false);

    try {
      const response = await fetch(
        `${API_BASE}/bookings?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data: ApiResponse = await response.json();

      setBookings(data.data || []);
      setSearched(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading bookings...</Text>
        </View>
      );
    }

    if (!searched) {
      return null;
    }

    if (bookings.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No bookings found for{" "}
            <Text style={styles.boldText}>{email}</Text>
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {bookings.length} booking
          {bookings.length !== 1 ? "s" : ""} for{" "}
          <Text style={styles.boldText}>{email}</Text>
        </Text>

        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <BookingCard booking={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.pageTitle}>My Bookings</Text>

      <Text style={globalStyles.pageSub}>
        Track all your expert sessions
      </Text>

      <View style={styles.lookupContainer}>
        <Text style={styles.lookupTitle}>
          Look up your bookings
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            onSubmitEditing={search}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              error ? styles.inputError : null,
            ]}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[
              styles.button,
              loading ? styles.buttonDisabled : null,
            ]}
            onPress={search}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Searching..." : "Search"}
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>

      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
};

export default MyBookingsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
  },

  pageSubtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 24,
  },

  lookupContainer: {
    borderColor: COLORS.border,
    borderWidth: 2,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },

  lookupTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 14,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    fontSize: 15,
    marginRight: 10,
    color: "#111",
  },

  inputError: {
    borderColor: "red",
  },

  button: {
    height: 48,
    paddingHorizontal: 18,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  errorText: {
    marginTop: 8,
    color: "red",
    fontSize: 14,
  },

  content: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
  },

  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },

  boldText: {
    fontWeight: "700",
    color: "#111",
  },

  resultContainer: {
    flex: 1,
  },

  resultText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },

  listContainer: {
    paddingBottom: 20,
  },
});