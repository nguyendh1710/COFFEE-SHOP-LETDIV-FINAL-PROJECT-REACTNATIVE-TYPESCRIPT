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
      marginTop: 1,  // Giảm khoảng cách phía dưới của logo
      marginLeft: 70,
      width: 140,
      height: 140,
      resizeMode: "contain",
    },
    title: {
      ...(theme.typography.heading1 as TextStyle),
      color: theme.colors.primary,
      textAlign: "center",
      // marginTop: 1,
      paddingBottom: 12,
      paddingTop: 4  // Khoảng cách phía dưới để tránh bị che phân nữa chữ
    },
    inputWrapper: {
      width: 290,
      marginBottom: 2
    },
    inputBox: {
      marginBottom: 8
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 4,
      marginTop: 2,
      margin: "auto",
    },
    button: {},
    icon: {
      zIndex: 10
    },
    textLinkWrapperTop: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 6,  // Giảm khoảng cách dưới để các link text không bị ẩn
      paddingHorizontal: 16, // Đảm bảo có padding bên trái và bên phải
      alignItems: 'center', // Căn giữa các text link trong View
      justifyContent: 'space-between', // Đảm bảo các phần tử con sẽ căn giữa
    },
    textLinkWrapperBottom: {
      marginTop: 20, // Thêm khoảng cách nếu cần để các link dưới không bị chồng lấp
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textLink: {
      ...(theme.typography.title as TextStyle),
      color: theme.colors.primary, // Đảm bảo màu sắc đủ nổi bật trên nền
      fontSize: 16, // Kích thước font rõ ràng
      textDecorationLine: 'underline', // Tạo hiệu ứng gạch dưới cho text như một liên kết
    },
  });
};
