import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "./../../theme/themeTypes";

const { width, height } = Dimensions.get("window");

export const customStyles = (theme: TypeOfTheme,
  size: "small" | "medium" | "large", disabled: boolean) => {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: disabled ? '#d3d3d3' : theme.colors.primary,
      backgroundColor: disabled ? '#f0f0f0' : '#fff',
    },
    input: {
      flex: 1,
      marginLeft: 12
      // ...baseInputStyle,
      // ...sizeStyles[size],
    },
    icon: {
      marginHorizontal: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: '900',
      color: theme.colors.primary,
    },
    separator: {
      height: 20,
      width: 1,
      backgroundColor: '#ccc',
      marginHorizontal: 4,
    },
    rightIcon: {
      paddingHorizontal: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },

    small: {
      flex: 1,
      height: 20,
      fontSize: 14,
    },
    medium: {
      flex: 1,
      height: 40,
      fontSize: 16,
    },
    large: {
      flex: 1,
      height: 50,
      fontSize: 18,
    },
  });
};
