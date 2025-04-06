
import { StyleSheet, TextStyle, Dimensions } from "react-native";
import { TypeOfTheme } from "../../../theme/themeTypes";

// Lấy kích thước màn hình hiện tại
const { width, height } = Dimensions.get("window");

// Tạo customStyles nhận theme làm tham số và trả về styles động
export const customStyles = (theme: TypeOfTheme) => {
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "stretch",
      borderRadius: 10,
      height: 200,
      width: 240,
      // Shadow cho iOS
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      position: "relative",
      // Shadow cho Android
      elevation: 8,
    },
    imageContainer: {
      width: 220,
      borderRadius: 10,
      aspectRatio: 1.764,
      marginBottom: 'auto'
    },
    mainImage: {
      marginTop: 14,
      marginLeft: 15,
      width: 210,
      height: 100,
      borderRadius: theme.radius.radiusM
    },
    discountContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 0,
      backgroundColor: "#FAF0F0",
      justifyContent: "center",
    },
    discountTextContainer: {
      paddingHorizontal: 8,
      paddingVertical: 3,
    },
    discountText: {
      fontSize: 10,
      color: "#FF0505",
      fontWeight: "700",
    },
    productInfoContainer: {
      width: 210,
      marginLeft: 10,
      flexDirection: "row",
      paddingBottom: 14,
      minHeight: 30,
      marginBottom: 50,
      paddingHorizontal: 10
    },
    nameContainer: {
      flex: 1,
      flexShrink: 1,
    },
    productName: {
      ...theme.typography.textSmall,
      color: theme.colors.textBlack,
      marginRight: 10,
    },
    priceContainer: {
      width: 74,
      paddingLeft: 22,
      flexShrink: 1,
      alignItems: "center",

    },
    priceText: {
      ...theme.typography.textSmall,
      color: theme.colors.textBlack,

    },
    bottomImage: {
      width: "100%",
      aspectRatio: 6.45,
      marginTop: 4,
      minHeight: 30,
    },
    text: {
      ...theme.typography.textMedium,
      color: theme.colors.textBlack,
      textAlign: 'center',
      lineHeight: 22,
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    ratingContainer: {
      position: "absolute",
      width: 30,
      bottom: 20,
      left: 70
    },
    iconContainer: {
      flexDirection: 'row',
      width: 40,
      position: "absolute",
      bottom: 20,
      left: 150
    },
    iconEye: {
      color: theme.colors.primary
    },
    iconCart: {
      color: theme.colors.primary
    }
  });
};




