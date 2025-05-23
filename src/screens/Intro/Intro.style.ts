import { StyleSheet, TextStyle, Dimensions  } from 'react-native';
import { TypeOfTheme } from '../../theme/themeTypes';



// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get('window');
// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    background: {
      flex: 1,           // Giúp View mở rộng toàn màn hình
      width: width,      // Sử dụng kích thước thực tế thay vì '100%'
      height: height,    // Đảm bảo full screen
      justifyContent: 'center', // Căn giữa nội dung
      alignItems: 'center',
    },
    container: {
      flex: 1,
      // backgroundColor: theme.colors.background, // Dùng theme để thay đổi background
      padding: 16,

    },
    themeContainer: {
      marginLeft: 400,
      marginTop: 40,
      width: 200,
      height: 20,
      flexDirection: "row",
      gap: 1
    },
    iconLeft: {},
    iconRight: {

    },
    buttonWrapper: {
      position: "absolute",
      bottom: 220,
      left: 0,
      right: 0,
      alignItems: "center",
    },
    button: {

    },
    text: {
      ...(theme.typography.title as TextStyle), // Ép kiểu tường minh
      color: theme.colors.text, // Dùng màu text từ theme
    },
     logo:{
    width: 100,      
    height: 100, 
    margin: "auto"
  }
  });
};
