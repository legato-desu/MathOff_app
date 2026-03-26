import { StyleSheet } from "react-native";

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },

    header: {
      color: colors.text,
      fontSize: 24,
      marginBottom: 10,
      fontWeight: "bold",
    },

    tabsContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },

    activeTab: {
      color: colors.primary,
      marginRight: 20,
      fontWeight: "bold",
    },

    inactiveTab: {
      color: colors.text,
      opacity: 0.6,
    },

    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },

    sectionTitle: {
      color: colors.text,
      fontWeight: "bold",
    },

    viewAll: {
      color: colors.primary,
    },

    graphRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 25,
    },

    quickLearnTitle: {
      color: colors.text,
      fontSize: 20,
      marginBottom: 15,
      fontWeight: "bold",
    },

    card: {
      backgroundColor: colors.card,
      padding: 15,
      borderRadius: 12,
      marginBottom: 10,
    },

    cardTitle: {
      color: colors.text,
      fontWeight: "bold",
      marginBottom: 5,
    },

    cardSubtitle: {
      color: colors.text, 
      fontSize: 12,
    },
  });