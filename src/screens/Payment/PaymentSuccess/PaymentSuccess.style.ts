import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../../theme/themeTypes";

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get("window");

// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    background: {
      width: width,      // Sử dụng kích thước thực tế thay vì '100%'
      height: height,    // Đảm bảo full screen
      justifyContent: "center", // Căn giữa nội dung
      alignItems: "center",
    },
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "space-between", // Phân bố đều các block như input, button, text link
      paddingHorizontal: 38,
      paddingVertical: 24,
    },

    iconLeft: {},
    iconRight: {},
    logoWrapper: {
      alignItems: "center", // Căn giữa logo
    },
    logo: {
      marginBottom: -42,
      marginTop: 6, // Giảm khoảng cách phía dưới của logo
      margin: 'auto',

      width: 100,
      height: 100,
      resizeMode: "contain",
    },
    title: {
      ...(theme.typography.heading1 as TextStyle),
      color: theme.colors.primary,
      textAlign: "center",
      // marginTop: 1,
      marginTop: 192,
      paddingTop: 4,  // Khoảng cách phía dưới để tránh bị che phân nữa chữ
      paddingBottom: 10,
      marginHorizontal: 92
    },
    text: {
      ...(theme.typography.textMedium as TextStyle),
      color: theme.colors.primary, // Đảm bảo màu sắc đủ nổi bật trên nền
      marginBottom: 12,
      textAlign: "justify",
      fontWeight: "bold"
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      marginHorizontal: 82,
      paddingVertical: 32
    },
    button: {},
    icon: {
      zIndex: 10
    },
  });
};
