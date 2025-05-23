import { TypeOfTheme } from './themeTypes'; // Import kiểu TypeOfTheme

export const lightTheme: TypeOfTheme = {
  colors: {
    background: "#FAF0F0",
    textBlack: "#000000",
    textWhite: "#ffffff",
    primary: "#8F7D5E",
    enableButton: "#855B44",
    unableButton: "#808080",
  },
  typography: {
    heading1: {
      fontFamily: "Inter_700Bold", // Sử dụng chuỗi
      fontSize: 24,
      lineHeight: 20,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    title: {
      fontFamily: "Inter_500Medium", // Sử dụng chuỗi
      fontSize: 16,
      lineHeight: 20,
      fontStyle: "normal",
      fontWeight: "500",
    },
    subTitle: {
      fontFamily: "Inter_700Bold",
      fontSize: 16,
      lineHeight: 20,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    textMedium: {
      fontFamily: "Inter_400Regular",
      fontSize: 14,
      lineHeight: 20,
      fontStyle: "normal",
      fontWeight: "400",
    },
    textSmall: {
      fontFamily: "Inter_400Regular",
      fontSize: 12,
      lineHeight: 20,
      fontStyle: "normal",
      fontWeight: "bold",
    },
  },
  radius: {
    radiusM: 22,
    radiusXl: 50,

  },
};

export const darkTheme: TypeOfTheme = {
  ...lightTheme,
  colors: {
    background: "#121212",
    text: "#ffffff",
    primary: "#8F7D5E",
    enableButton: "#855B44",
    unableButton: "#808080",
  },
};
