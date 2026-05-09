import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../styles/global";

interface ErrorBoxProps {
  message: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        ⚠ {message}
      </Text>
    </View>
  );
};

export default ErrorBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(244,63,94,0.08)",
    borderWidth: 1,
    borderColor: "rgba(244,63,94,0.3)",
    borderRadius: 10,
    padding: 16,
    marginVertical: 20,
  },

  text: {
    color: COLORS.danger,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
});