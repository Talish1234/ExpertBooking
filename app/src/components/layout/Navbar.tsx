import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import globalStyles from "../../styles/global";

type ActiveTab = "experts" | "myBookings";

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
}) => {
  return (
    <View style={globalStyles.nav}>
      <Text style={globalStyles.navLogo}>
        ExpertConnect
      </Text>

      <View style={globalStyles.navTabs}>
        <TouchableOpacity
          style={[
            globalStyles.navTab,
            activeTab === "experts" &&
              globalStyles.navTabActive,
          ]}
          onPress={() => onNavigate("experts")}
          activeOpacity={0.8}
        >
          <Text
            style={[
              globalStyles.navTabText,
              activeTab === "experts" &&
                globalStyles.navTabTextActive,
            ]}
          >
            Experts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            globalStyles.navTab,
            activeTab === "myBookings" &&
              globalStyles.navTabActive,
          ]}
          onPress={() =>
            onNavigate("myBookings")
          }
          activeOpacity={0.8}
        >
          <Text
            style={[
              globalStyles.navTabText,
              activeTab === "myBookings" &&
                globalStyles.navTabTextActive,
            ]}
          >
            My Bookings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;