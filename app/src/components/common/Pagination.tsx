import React, { use } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../styles/global";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  if (totalPages <= 1) return null;
   const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: inset.bottom + 12 }]}>
      <TouchableOpacity
        style={[
          styles.button,
          page === 1 && styles.disabledButton,
        ]}
        onPress={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <Text style={styles.buttonText}>‹</Text>
      </TouchableOpacity>

      {Array.from({ length: totalPages }, (_, i) => {
        const currentPage = i + 1;
        const isActive = page === currentPage;

        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.button,
              isActive && styles.activeButton,
            ]}
            onPress={() => onChange(currentPage)}
          >
            <Text
              style={[
                styles.buttonText,
                isActive && styles.activeButtonText,
              ]}
            >
              {currentPage}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={[
          styles.button,
          page === totalPages && styles.disabledButton,
        ]}
        onPress={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        <Text style={styles.buttonText}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
    flexWrap: "wrap",
    backgroundColor: "transparent",
  },

  button: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  activeButton: {
    backgroundColor: COLORS.accent2,
    borderColor: COLORS.accent2,
  },

  disabledButton: {
    opacity: 0.3,
  },

  buttonText: {
    color: COLORS.muted,
    fontSize: 14,
    fontWeight: "600",
  },

  activeButtonText: {
    color: "#fff",
  },
});