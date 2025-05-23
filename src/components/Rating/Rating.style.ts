
import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../theme/themeTypes";

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get("window");

// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      selectedRating: {
        marginTop: 0,
        fontSize: 10,
        color: '#333',
      },
  
  });
};




