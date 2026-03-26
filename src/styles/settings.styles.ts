import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },

    header: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "600",
      marginBottom: 20,
    },

    profileCard: {
      backgroundColor: colors.card,
      borderRadius: 18,
      padding: 18,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 25,
    },

    avatar: {
      width: 50,
      height: 50,
      borderRadius: 15,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 15,
    },

    name: {
  color: colors.text,
  fontSize: 16,
  fontWeight: "500",
},

    plan: {
      color: colors.primary,
      marginTop: 2,
    },

    section: {
      color: colors.textMuted,
      fontSize: 12,
      marginBottom: 10,
      marginTop: 10,
      letterSpacing: 1,
    },

    card: {
      backgroundColor: colors.card,
      borderRadius: 15,
      padding: 15,
      marginBottom: 20,
    },

    item: {
      color: colors.text,
      marginLeft: 10,
    },

    value: {
      color: colors.textSecondary,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },

    rowLeft: {
      flexDirection: "row",
      alignItems: "center",
    },

    logout: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: colors.error,
      borderRadius: 14,
      padding: 15,
      alignItems: "center",
    },

    logoutText: {
      color: colors.error,
      fontWeight: "600",
    },
  });