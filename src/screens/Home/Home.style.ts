import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../theme/themeTypes";

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
      backgroundColor: theme.colors.background,

    },
    scrollViewContainer: {
      flexGrow: 1, // Đảm bảo content bên trong có thể cuộn

    },
    container: {
      flex: 1,
      width: "100%",
      justifyContent: "space-between", // Phân bố đều các block như input, button, text link


    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 36
    },
    header: {

    },
    headerTitle: {
      ...theme.typography.heading1,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginBottom: 12,
      paddingTop: 12
    },
    logo: {
      marginTop: 1,  // Giảm khoảng cách phía dưới của logo
      marginLeft: 90,
      width: 84,
      height: 84,
      resizeMode: "contain",
      margin: "auto"
    },
    sectionHeader: {
      marginVertical: 20
    },
    footer: {
      padding: 4,
      // backgroundColor: theme.colors.primary
    },
    footerText: {
      ...theme.typography.textSmall,
      color: theme.colors.primary,
      textAlign: 'center',
    },
    footerLink: {
      textAlign: 'center',
    },
    title: {
      ...theme.typography.subTitle,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginBottom: 22
    },
    text: {
      ...theme.typography.textMedium,
      color: theme.colors.textBlack,
      textAlign: 'center',

    },

    searchContainer: {
      marginTop: 30,
    },
    saleContainer: {
      height: 300,
      marginBottom: 20,
      paddingTop: 20  // Khoảng cách phía dưới để tránh bị che phân nữa chữ
    },
    iconRight: {

    },
    slider: {
      paddingTop: 90,
      height: 30,
    },
    saleImage: {

      width: 132, // full width trừ padding
      height: 100,
      borderRadius: 10
    },
    newContainer: {
      marginTop: 40,
    },
    item: {
      flex: 1,
      margin: 8,
      maxWidth: (width - 48) / 2, // 48 = paddingHorizontal (16 * 2) + margin (8 * 2)

    },
    gridContainer: {

    },
    productRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginHorizontal: 3
    },
  });
};




