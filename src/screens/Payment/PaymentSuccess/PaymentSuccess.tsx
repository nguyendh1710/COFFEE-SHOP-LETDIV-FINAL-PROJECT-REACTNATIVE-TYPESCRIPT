import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { customStyles } from "./PaymentSuccess.style";
import { useTheme } from "./../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";

export default function PaymentSuccess() {
  const { theme, toggleTheme } = useTheme();
  const [isEnableLight, setIsEnableLight] = useState<boolean>(true); // Xác định theme ban đầu

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
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Thanh toán thành công!</Text>
        {/* Text */}
        <Text style={styles.text}>
          Bạn đã thanh toán thành công cho đơn hàng ID 003639
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
      
          >
            Trang chủ
          </ButtonMain>
        </View>
        {/* Link */}
      </View>
    </ImageBackground>
  );
}
