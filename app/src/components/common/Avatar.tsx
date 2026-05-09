import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { getInitials } from "../../utils";
import { CATEGORY_COLORS } from "../../config";

interface AvatarProps {
  id?: string;
  name?: string;
  large?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  id = "0",
  name = "?",
  large = false,
}) => {
  const colors = Object.values(CATEGORY_COLORS);

  const color =
    colors[parseInt(id.slice(-4), 16) % colors.length] ||
    "#6366f1";

  return (
    <View
      style={[
        large ? styles.avatarLarge : styles.avatar,
        {
          backgroundColor: `${color}22`,
          borderColor: `${color}44`,
        } as ViewStyle,
      ]}
    >
      <Text
        style={[
          large ? styles.avatarLargeText : styles.avatarText,
          { color },
        ]}
      >
        {getInitials(name)}
      </Text>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
  },

  avatarLargeText: {
    fontSize: 28,
    fontWeight: "800",
  },
});