import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../theme/themeTypes";

const { width, height } = Dimensions.get("window");

export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    container: {

      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      padding: 24,


      shadowColor: "#000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      marginTop: 10,
      color: "#333",
    },
    message: {
      fontSize: 16,
      color: "#555",
      marginTop: 6,
      textAlign: "center",
    },
  });
};
