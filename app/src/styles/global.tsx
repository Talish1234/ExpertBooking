import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const COLORS = {
  bg: "#09090f",
  surface: "#111118",
  surface2: "#1a1a24",
  border: "#2a2a38",
  text: "#f0f0f8",
  muted: "#7070a0",
  accent: "#a78bfa",
  accent2: "#6366f1",
  success: "#10b981",
  danger: "#f43f5e",
  warning: "#f59e0b",
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 24,
  },

  app: {
    width: "100%",
    alignSelf: "center",
    maxWidth: 1200,
  },

  /* NAVBAR */
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 36,
  },

  navLogo: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.accent,
  },

  navTabs: {
    flexDirection: "row",
    gap: 8,
  },

  navTab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
  },

  navTabActive: {
    backgroundColor: "rgba(167,139,250,0.1)",
  },

  navTabText: {
    color: COLORS.muted,
    fontSize: 14,
  },

  navTabTextActive: {
    color: COLORS.accent,
  },

  /* PAGE */
  pageTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },

  pageSub: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 28,
  },

  /* BUTTONS */
  primaryButton: {
    backgroundColor: COLORS.accent2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  outlineButtonText: {
    color: COLORS.text,
    fontSize: 15,
  },

  /* FORM */
  formGroup: {
    marginBottom: 16,
  },

  formLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.muted,
    marginBottom: 6,
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    color: COLORS.text,
    fontSize: 15,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
  },

  /* CARD */
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
    marginBottom: 14,
  },

  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },

  cardBio: {
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 20,
    marginBottom: 14,
  },

  /* AVATAR */
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: COLORS.accent2,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: COLORS.accent2,
    alignItems: "center",
    justifyContent: "center",
  },

  /* STATUS */
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  statusPending: {
    backgroundColor: "rgba(245,158,11,0.15)",
  },

  statusConfirmed: {
    backgroundColor: "rgba(16,185,129,0.15)",
  },

  statusCompleted: {
    backgroundColor: "rgba(99,102,241,0.15)",
  },

  statusCancelled: {
    backgroundColor: "rgba(244,63,94,0.1)",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  /* LOADING */
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 60,
  },

  loadingText: {
    color: COLORS.muted,
    marginTop: 12,
  },

  /* DETAIL */
  detailHeader: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 28,
    marginBottom: 32,
  },

  detailName: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 8,
  },

  detailBio: {
    color: COLORS.muted,
    lineHeight: 24,
    fontSize: 14,
    marginBottom: 16,
  },

  /* SLOT BUTTON */
  slotButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  slotButtonSelected: {
    backgroundColor: "rgba(167,139,250,0.15)",
    borderColor: COLORS.accent,
  },

  slotButtonBooked: {
    backgroundColor: "rgba(244,63,94,0.08)",
    borderColor: "rgba(244,63,94,0.3)",
  },

  slotButtonText: {
    color: COLORS.text,
    fontSize: 14,
  },

  /* SUCCESS CARD */
  successCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.3)",
  },

  successTitle: {
    color: COLORS.success,
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },

  successMessage: {
    color: COLORS.muted,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },

  /* RESPONSIVE */
  responsiveRow: {
    flexDirection: width < 640 ? "column" : "row",
    gap: 16,
  },
});

export default globalStyles;