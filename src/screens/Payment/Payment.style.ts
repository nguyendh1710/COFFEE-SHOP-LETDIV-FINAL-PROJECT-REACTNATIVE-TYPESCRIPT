import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../theme/themeTypes";

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get("window");

// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      // backgroundColor: '#fff',
      // padding: 20,
      marginHorizontal: 16,
      marginBottom: 20,
      // borderRadius: 16,
      // elevation: 4,
    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 26
    },
    header: {
      ...(theme.typography.heading1 as TextStyle),
      // fontSize: 18,
      // fontWeight: '600',
      paddingTop: 20,
      paddingBottom: 20,
      marginTop: 70,
      marginLeft: 120,
      color: theme.colors.primary,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginBottom: 20,
      marginTop: 10,
    },
    backgroundContent: {
      flex: 1,
    },
    subTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 16,
      marginBottom: 8,
      color: '#555',
    },
    dropdown: {
      borderColor: '#ccc',
      borderRadius: 12,
      marginBottom: 10,
    },
    dropdownContainer: {
      borderColor: '#ccc',
      borderRadius: 12,
    },
    dropdownItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
    },
    dropdownItemText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#333',
    },
    bankLogo: {
      width: 24,
      height: 24,
      resizeMode: 'contain',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      fontSize: 16,
      marginBottom: 10,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    totalText: {
      fontSize: 26,
      fontWeight: '500',
    },
    amount: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#0a7',
    },
    button: {
      backgroundColor: '#0a7',
      padding: 14,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 24,
    },
    buttonText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: '600',
      marginLeft: 8,
    },
    textDes: {
     
      ...(theme.typography.title as TextStyle),
      color: "rgba(127, 147, 27, 0.85)", // Đảm bảo màu sắc đủ nổi bật trên nền
      fontSize: 16, // Kích thước font rõ ràng
         marginTop:8,
      marginBottom:8
    },
  });
};
export const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: '#333',
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: '#333',
    marginBottom: 10,
  },
  iconContainer: {
    top: 14,
    right: 12,
  },
};