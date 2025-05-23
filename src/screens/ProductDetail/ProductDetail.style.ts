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
      position:"relative"
    },
    container: {
      flex: 1,
      // backgroundColor: theme.colors.background, // Dùng theme để thay đổi background
      padding: 16,
      marginBottom: 22
    },
      backButton: {
       position:"absolute",
       top:36,
       left:36
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
      bottom: 40,
      right: 30,
    },
    buttonSellerWrapper:{
  position: "absolute",
      bottom: 120,
      right: 4,
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
    textType:{
      ...theme.typography.title,
      color: theme.colors.primary,
      // marginTop: 4
    },
    titleProfit: {
      ...theme.typography.heading1,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginTop: 32,
      paddingTop: 12,
      marginBottom: 22
    },
    textProfit: {

    },
    titleWay: {
      ...theme.typography.heading1,
      color: theme.colors.textBlack,
      textAlign: 'justify',
      marginTop: 32,
      paddingTop: 12,
      marginBottom: 2
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

    }
  });
};
