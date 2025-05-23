import { StyleSheet, TextStyle, Dimensions } from 'react-native';
import { TypeOfTheme } from '../../theme/themeTypes';

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get('window');
// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    background: {
      flex: 1,
      width: width,
      height: height,
      justifyContent: 'center', // Căn giữa nội dung
      alignItems: 'center',
      position: "relative"
    },
    container: {
      flex: 1,
      // backgroundColor: "#f7f8fa",
      paddingTop: 40,
      paddingHorizontal: 16,
      marginTop: 40
    },
    header: {
      fontSize: 26,
      fontWeight: "bold",
      color: theme.colors.primary,
      marginBottom: 20,
    },
    list: {
      paddingBottom: 20,
    },
    card: {
      width: width - 32,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      elevation: 6,
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    icon: {
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "700",

    },
    description: {
      color: "#eee",
      fontSize: 14,
      marginTop: 4,
    },
    button: {
      backgroundColor: "#ffffff88",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
      marginLeft: 12,
    },
    buttonText: {
      color: "#333",
      fontWeight: "600",
    },
    subTitleWay: {
      ...theme.typography.title,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginVertical: 22
    },
    textWaySource: {

    },
    textWay: {

    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 26,
    },
  });
};
