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
      flex: 1,
      padding: 16,
      backgroundColor: "rgba(234, 197, 206, 0.85)",
      position: "relative",
      paddingBottom:12
    },
    backButton: {
      position: "absolute",
      top: 36,
      left: 26
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginBottom: 2,
      marginTop: 22
    },
    title: {
      ...(theme.typography.heading1 as TextStyle),
      color: theme.colors.primary,
      fontWeight: "bold",
      textAlign: "center",
      paddingTop: 6
    },
    removeAllButtonWrapper: {
      position: "absolute",
      top: 132,
      left: 280
    },
    listContent: {
      paddingBottom: 100,
    },
    cartItem: {
      flexDirection: "row",
      backgroundColor: "rgba(236, 241, 242, 0.85)",
      padding: 12,
      marginVertical: 13,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    itemImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 12,
    },
    itemDetails: {
      flex: 1,
      justifyContent: "space-between",
    },
    itemName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#222",
      marginBottom: 4,
    },
    itemType: {
      fontSize: 14,
      color: "#666",
    },
    itemPrice: {
      fontSize: 14,
      color: "#444",
      marginVertical: 2,
    },
    itemTotal: {
      fontSize: 14,
      fontWeight: "600",
      color: "#000",
      marginBottom: 6,
    },
    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 6,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: "500",
      marginHorizontal: 8,
    },
    removeButton: {
      alignSelf: "flex-start",
      marginTop: 4,

      backgroundColor: "#ffe5e5",
      borderColor: "#ff4d4d",
    },
    boxButton: {
      flexDirection: "row",
      gap: 6
    },
    totalContainer: {
      backgroundColor: "rgba(225, 190, 75, 0.85)",
      padding: 16,
      borderTopWidth: 1,
      borderColor: "#ddd",
      borderRadius: 16,
      paddingTop: 4
    },
    totalText: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 12,
      textAlign: "center",
      color: "#666",
    },
    checkoutButton: {
      alignSelf: "center",
      paddingHorizontal: 32,
    },
    textLinkWrapperBottom: {
      marginTop: 20, // Thêm khoảng cách nếu cần để các link dưới không bị chồng lấp
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {

    },
    textLink: {
      ...(theme.typography.title as TextStyle),
      color: theme.colors.primary, // Đảm bảo màu sắc đủ nổi bật trên nền
      fontSize: 16, // Kích thước font rõ ràng
      textDecorationLine: 'underline', // Tạo hiệu ứng gạch dưới cho text như một liên kết
    },
    voucherContainer: {
      marginHorizontal: 16,
      borderRadius: 20,
      // padding: 18,
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 8,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      color: "rgba(134, 36, 49, 0.85)",
      fontSize: 22,
      fontWeight: "bold",
    },
  });
};
