import { StyleSheet, TextStyle, Dimensions } from 'react-native';
import { TypeOfTheme } from "../../../theme/themeTypes";

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get('window');
// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      flex: 1,
      // backgroundColor: theme.colors.background, // Dùng theme để thay đổi background
      marginTop: 26,
      marginHorizontal: 22,
    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 26
    },
    buttonWrapper: {
      marginTop: 22,
      alignItems: 'center',
    },
    button: {
    },
    text: {
      ...(theme.typography.title as TextStyle), // Ép kiểu tường minh
      color: theme.colors.text, // Dùng màu text từ theme
    },
    inputWrapper: {
      width: 310,
      marginBottom: 8
    },
    logoWrapper: {
      paddingRight: 10,
      alignItems: "center",
      marginTop: 60, // Căn giữa logo
    },
    logo: {
      width: 140,
      height: 140,
      resizeMode: "contain",
    },
    contentWrapper: {

    },
    titleProfit: {
      ...theme.typography.heading1,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginTop: 32,
      paddingTop: 12,
      marginBottom: 22
    },
    title: {
      ...theme.typography.heading1,
      color: theme.colors.primary,
      textAlign: "justify",
      paddingTop: 12,
      marginBottom: 2,
      marginLeft: 52
    },
    subTitleWay: {
      ...theme.typography.title,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginVertical: 22
    },
    imageTitle: {
      color: theme.colors.primary,
      fontWeight: "bold",
      marginBottom: 10,
    }
    ,
    boxCamera: {
      alignItems: "center", // Để icon và text canh giữa theo chiều ngang
      justifyContent: "center",
      paddingBottom: 22,
      marginLeft: 0, // XÓA marginLeft, vì sẽ dùng `alignSelf: "center"` hoặc để trong container căn giữa
      alignSelf: "center", // Căn giữa toàn bộ khối camera trong parent
    },
    imageImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: "#ccc",
      alignSelf: "center", // Quan trọng: giữ ảnh nằm giữa khối
    },
    iconCamera: {
      width: 90,
      height: 90,
      borderRadius: 10,
      marginLeft:18,
      borderWidth: 2,
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0",
    },

    imageText: {
      marginTop: 12,
      textAlign: "center",
      alignSelf: "center",
      color: theme.colors.primary,
    },
    label: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 6,
      color: theme.colors.primary,

    },
    inputAndroid: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: '#f0f0f0',
    },
    inputIOS: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: '#f0f0f0',
    },
  });
};
