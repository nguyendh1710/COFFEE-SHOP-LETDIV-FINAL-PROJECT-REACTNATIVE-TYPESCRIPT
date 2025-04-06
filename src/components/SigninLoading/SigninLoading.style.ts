import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from './../../theme/themeTypes';


// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get("window");

export const customStyles = (theme:TypeOfTheme) => StyleSheet.create({
  background: {
    width: width,      // Sử dụng kích thước thực tế thay vì '100%'
    height: height,    // Đảm bảo full screen
     backgroundColor: theme.colors.background
  },
  logo:{
    width: 200,      
    height: 200, 
    margin: "auto"
  }
});
