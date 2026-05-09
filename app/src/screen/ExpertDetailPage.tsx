import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { API_BASE } from "../config";

import {
  Avatar,
  Spinner,
  ErrorBox,
} from "../components/common";

import TimeSlots from "../components/experts/TimeSlots";

import socket from "../socket";

import {
  getCategoryColor,
  formatDate,
} from "../utils";

import { COLORS } from "../styles/global";

interface AvailableSlot {
  date: string;
  slots: string[];
}

interface Expert {
  _id: string;
  name: string;
  category: string;
  bio: string;
  rating?: number;
  reviewCount: number;
  experience: number;
  hourlyRate: number;
  availableSlots: AvailableSlot[];
}

interface ExpertDetailPageProps {
  expertId: string;
  onBook: (
    expert: Expert,
    date: string,
    slot: string
  ) => void;

  onBack: () => void;
}

const ExpertDetailPage: React.FC<
  ExpertDetailPageProps
> = ({
  expertId,
  onBook,
  onBack,
}) => {
  const [expert, setExpert] =
    useState<Expert | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [selectedSlot, setSelectedSlot] =
    useState<string | null>(null);

  const [bookedSlots, setBookedSlots] =
    useState<Record<string, boolean>>(
      {}
    );

  // Fetch expert
  useEffect(() => {
    const fetchExpert = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `${API_BASE}/experts/${expertId}`
        );

        if (!res.ok) {
          throw new Error(
            "Expert not found"
          );
        }

        const data = await res.json();

        setExpert(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpert();
  }, [expertId]);

  // Socket.io updates
  useEffect(() => {
    const onBooked = ({
      expertId: eid,
      date,
      timeSlot,
    }: any) => {
      if (eid !== expertId) return;

      setBookedSlots((prev) => ({
        ...prev,
        [`${date}_${timeSlot}`]:
          true,
      }));

      if (
        selectedDate === date &&
        selectedSlot === timeSlot
      ) {
        setSelectedDate(null);
        setSelectedSlot(null);
      }
    };

    const onRestored = ({
      expertId: eid,
      date,
      timeSlot,
    }: any) => {
      if (eid !== expertId) return;

      setBookedSlots((prev) => ({
        ...prev,
        [`${date}_${timeSlot}`]:
          false,
      }));
    };

    socket.on(
      "slotBooked",
      onBooked
    );

    socket.on(
      "slotRestored",
      onRestored
    );

    return () => {
      socket.off(
        "slotBooked",
        onBooked
      );

      socket.off(
        "slotRestored",
        onRestored
      );
    };
  }, [
    expertId,
    selectedDate,
    selectedSlot,
  ]);

  if (loading) {
    return (
      <Spinner label="Loading expert..." />
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
        >
          <Text
            style={styles.backButtonText}
          >
            ← Back
          </Text>
        </TouchableOpacity>

        <ErrorBox message={error} />
      </View>
    );
  }

  if (!expert) return null;

  const color = getCategoryColor(
    expert.category
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButton}
      >
        <Text
          style={styles.backButtonText}
        >
          ← Back to experts
        </Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.detailHeader}>
        <Avatar
          id={expert._id}
          name={expert.name}
          large
        />

        <View style={styles.info}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: `${color}22`,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color },
              ]}
            >
              {expert.category}
            </Text>
          </View>

          <Text style={styles.name}>
            {expert.name}
          </Text>

          <Text style={styles.bio}>
            {expert.bio}
          </Text>

          <View style={styles.metaWrap}>
            <View style={styles.metaChip}>
              <Text
                style={styles.metaText}
              >
                ⭐{" "}
                {expert.rating?.toFixed(
                  1
                )}{" "}
                (
                {
                  expert.reviewCount
                }{" "}
                reviews)
              </Text>
            </View>

            <View style={styles.metaChip}>
              <Text
                style={styles.metaText}
              >
                💼{" "}
                {
                  expert.experience
                }{" "}
                years
              </Text>
            </View>

            <View style={styles.metaChip}>
              <Text
                style={styles.metaText}
              >
                💰 ₹
                {
                  expert.hourlyRate
                }
                /hr
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Time Slots */}
      <TimeSlots
        availableSlots={
          expert.availableSlots
        }
        bookedSlots={bookedSlots}
        selectedDate={
          selectedDate || ""
        }
        selectedSlot={
          selectedSlot || ""
        }
        onSelect={(
          date,
          slot
        ) => {
          setSelectedDate(date);
          setSelectedSlot(slot);
        }}
      />

      {/* CTA */}
      <TouchableOpacity
        style={[
          styles.bookButton,

          !selectedSlot &&
            styles.bookButtonDisabled,
            {
              marginBottom: 12,
            }
        ]}
        disabled={!selectedSlot}
        onPress={() =>
          onBook(
            expert,
            selectedDate || "",
            selectedSlot || ""
          )
        }
      >
        <Text
          style={styles.bookButtonText}
        >
          {selectedSlot
            ? `Book ${selectedSlot} on ${formatDate(
                selectedDate || ""
              )} →`
            : "Select a time slot to continue"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ExpertDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 24,
  },

  backButtonText: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "600",
  },

  detailHeader: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
  },

  info: {
    marginTop: 16,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 10,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "600",
  },

  name: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },

  bio: {
    color: COLORS.muted,
    lineHeight: 22,
    fontSize: 14,
    marginBottom: 16,
  },

  metaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  metaChip: {
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  metaText: {
    color: COLORS.text,
    fontSize: 13,
  },

  bookButton: {
    backgroundColor: COLORS.accent2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  bookButtonDisabled: {
    opacity: 0.4,
  },

  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});