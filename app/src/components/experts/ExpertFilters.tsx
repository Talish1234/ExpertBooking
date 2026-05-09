import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import { CATEGORIES } from "../../config";
import { COLORS } from "../../styles/global";

interface ExpertFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}

const ExpertFilters: React.FC<ExpertFiltersProps> = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Search by name..."
          placeholderTextColor={COLORS.muted}
          value={search}
          onChangeText={onSearchChange}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterScroll}
      >
        {CATEGORIES.map((c) => {
          const isActive = category === c;

          return (
            <TouchableOpacity
              key={c}
              style={[
                styles.filterButton,
                isActive && styles.filterButtonActive,
              ]}
              onPress={() => onCategoryChange(c)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  isActive && styles.filterButtonTextActive,
                ]}
              >
                {c}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ExpertFilters;

const styles = StyleSheet.create({
  container: {
    marginBottom: 28,
  },

  searchBox: {
    position: "relative",
    marginBottom: 16,
    justifyContent: "center",
  },

  searchIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
    color: COLORS.muted,
    fontSize: 16,
  },

  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    color: COLORS.text,
    fontSize: 14,
  },

  filterScroll: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 12,
  },

  filterButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  filterButtonActive: {
    backgroundColor: "rgba(167,139,250,0.15)",
    borderColor: COLORS.accent,
  },

  filterButtonText: {
    color: COLORS.muted,
    fontSize: 13,
  },

  filterButtonTextActive: {
    color: COLORS.accent,
    fontWeight: "600",
  },
});