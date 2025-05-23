import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { customStyles } from "./PaymentSuccess.style";
import { useTheme } from "./../../../context/ThemeContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/NavigationService";
import { Ionicons } from "@expo/vector-icons";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";

type PaymentSuccessScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "PaymentSuccess">;
  route: RouteProp<RootStackParamList, "PaymentSuccess">;
};

export default function PaymentSuccess({
  navigation,
  route,
}: PaymentSuccessScreenProps) {
  //
  const { theme, toggleTheme } = useTheme();
  const [isEnableLight, setIsEnableLight] = useState<boolean>(true); // Xác định theme ban đầu
  //
  // Lấy thông tin chi tiết sản phẩm từ params
  const { infoPayment } = route.params;
  //
  useEffect(() => {
    // Kiểm tra khi theme thay đổi và thiết lập trạng thái isEnableLight
    if (theme.colors.background === "#FAF0F0") {
      setIsEnableLight(true); // Nếu là theme sáng
    } else {
      setIsEnableLight(false); // Nếu là theme tối
    }
  }, [theme]); // Khi theme thay đổi, chạy lại effect này

  const styles = customStyles(theme); // Truyền theme vào customStyles

  return (
    <ImageBackground
      source={{
        uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/PaymentSuccess/payment-succeed-page.png?raw=true",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexGrow: 1,
          marginHorizontal: 16,
        }}
      >
        {/* Title */}
        <Text style={styles.title}>Cảm ơn bạn !</Text>
        {/* Text */}
        <Text style={styles.text}>
          Bạn đã thanh toán thành công cho đơn hàng: 003639
        </Text>
        <Text style={styles.text}>
          Phương thức thanh toán: {infoPayment.methodName ?? null}
        </Text>
        <Text style={styles.text}>
          Khuyến mãi: {infoPayment.promoCode ?? null}
        </Text>
        <Text style={styles.text}>
          Ghi chú đơn hàng: {infoPayment.note ?? null}
        </Text>
        <Text style={styles.text}>
          Đơn vị vận chuyển: {infoPayment.shippingName ?? null}
        </Text>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/PaymentSuccess/icon-park-solid_success%20(1).png?raw=true",
          }}
          alt="logo"
        />
        {/* Button */}
        <View style={styles.buttonWrapper}>
          <ButtonMain
            size="large"
            hasIcon={true}
            iconName={"arrow-back"}
            iconPosition={"start"}
            style={styles.button}
            onPress={() => navigation.navigate("Main")}
          >
            Trang chủ
          </ButtonMain>
        </View>
        {/* Link */}
      </ScrollView>
    </ImageBackground>
  );
}
