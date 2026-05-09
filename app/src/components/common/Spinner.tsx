import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { COLORS } from "../../styles/global";

interface SpinnerProps {
  label?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  label = "Loading...",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={COLORS.accent}
      />

      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },

  label: {
    marginTop: 12,
    color: COLORS.muted,
    fontSize: 14,
  },
});