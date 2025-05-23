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
      marginBottom: 22,
      marginTop: 42,
    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 26
    },
    listWrapper: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 42,
      marginBottom: 12
    },
    buttonWrapper: {
      position: "absolute",
      bottom: 80,
      right: 40,
      zIndex: 4
    },
    button: {

    },
    text: {
      ...(theme.typography.title as TextStyle), // Ép kiểu tường minh
      color: theme.colors.text, // Dùng màu text từ theme
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,  // Để logo có dạng hình tròn
      marginTop: 100,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 15,
      elevation: 5,
      borderWidth: 2,
      borderColor: '#ddd',
      opacity: 0.9,
    },
    contentWrapper: {

    },
    title: {
      ...theme.typography.heading1,
      color: theme.colors.primary,
      textAlign: 'justify',
      marginTop: 32,
      paddingTop: 62,
      paddingBottom: 12,
      paddingLeft: 72,
      marginBottom: 2
    },
    textName: {
      ...theme.typography.subTitle,
    },

  });
};
