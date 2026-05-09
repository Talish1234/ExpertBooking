import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Avatar } from "../common";
import { getCategoryColor } from "../../utils";
import { COLORS } from "../../styles/global";

interface Expert {
  _id: string;
  name: string;
  category: string;
  bio: string;
  rating?: number;
  reviewCount: number;
  experience: number;
  hourlyRate: number;
}

interface ExpertCardProps {
  expert: Expert;
  onClick: (expert: Expert) => void;
}

const ExpertCard: React.FC<ExpertCardProps> = ({
  expert,
  onClick,
}) => {
  const color = getCategoryColor(expert.category);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => onClick(expert)}
    >
      <View style={styles.cardTop}>
        <Avatar
          id={expert._id}
          name={expert.name}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {expert.name}
          </Text>

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
        </View>
      </View>

      <Text
        style={styles.bio}
        numberOfLines={2}
      >
        {expert.bio}
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.rating}>
            ★ {expert.rating?.toFixed(1)}
          </Text>

          <Text style={styles.statLabel}>
            {expert.reviewCount} reviews
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            {expert.experience}y
          </Text>

          <Text style={styles.statLabel}>
            experience
          </Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.statValue}>
            ₹{expert.hourlyRate}
          </Text>

          <Text style={styles.statLabel}>
            per hour
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpertCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 22,
    marginBottom: 20,
  },

  cardTop: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 14,
  },

  infoContainer: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  categoryBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: "500",
  },

  bio: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
    marginBottom: 14,
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 14,
  },

  stat: {
    gap: 2,
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },

  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
  },

  rating: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.warning,
  },
});