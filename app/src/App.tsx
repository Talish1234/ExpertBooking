import React, { useState } from "react";

import {
  View,
  StyleSheet,
  StatusBar,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import Navbar from "./components/layout/Navbar";

import ExpertListPage from "./screen/ExpertListPage";
import ExpertDetailPage from "./screen/ExpertDetailPage";
import BookingFormPage from "./screen/BookingFormPage";
import BookingSuccessPage from "./screen/BookingSuccessPage";
import MyBookingsPage from "./screen/MyBookingsPage";

import type { Expert } from "./types/expert";
import type { Booking } from "./types/booking";

import { COLORS } from "./styles/global";

type Screen =
  | "list"
  | "detail"
  | "book"
  | "success"
  | "myBookings";

type ActiveTab =
  | "experts"
  | "myBookings";

const App: React.FC = () => {
  const [screen, setScreen] =
    useState<Screen>("list");

  const [activeTab, setActiveTab] =
    useState<ActiveTab>("experts");

  const [selectedExpert, setSelectedExpert] =
    useState<Expert | null>(null);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const [selectedSlot, setSelectedSlot] =
    useState<string | null>(null);

  const [lastBooking, setLastBooking] =
    useState<Booking | null>(null);

  const navigate = (tab: ActiveTab) => {
    setActiveTab(tab);

    if (tab === "myBookings") {
      setScreen("myBookings");
    } else {
      setScreen("list");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.safeArea}
        edges={["top"]}
      >
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.bg}
        />

        <View style={styles.container}>
          <Navbar
            activeTab={activeTab}
            onNavigate={navigate}
          />

          {screen === "list" && (
            <ExpertListPage
              onSelect={(expert: Expert) => {
                setSelectedExpert(expert);
                setScreen("detail");
                setActiveTab("experts");
              }}
            />
          )}

          {screen === "detail" &&
            selectedExpert && (
              <ExpertDetailPage
                expertId={selectedExpert._id}
                onBook={(
                  expert: Expert,
                  date: string,
                  slot: string
                ) => {
                  setSelectedExpert(expert);
                  setSelectedDate(date);
                  setSelectedSlot(slot);
                  setScreen("book");
                }}
                onBack={() =>
                  setScreen("list")
                }
              />
            )}

          {screen === "book" &&
            selectedExpert &&
            selectedDate &&
            selectedSlot && (
              <BookingFormPage
                expert={selectedExpert}
                date={selectedDate}
                timeSlot={selectedSlot}
                onSuccess={(
                  booking: Booking
                ) => {
                  setLastBooking(booking);
                  setScreen("success");
                }}
                onBack={() =>
                  setScreen("detail")
                }
              />
            )}

          {screen === "success" &&
            lastBooking && (
              <BookingSuccessPage
                booking={lastBooking}
                onHome={() => {
                  setScreen("list");
                  setActiveTab(
                    "experts"
                  );
                }}
                onMyBookings={() =>
                  navigate(
                    "myBookings"
                  )
                }
              />
            )}

          {screen === "myBookings" && (
            <MyBookingsPage />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
});