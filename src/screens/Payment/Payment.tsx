import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import { customStyles } from "./Payment.style";
import { useTheme } from "./../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonMain from "../../components/Button/ButtonMain/ButtonMain";
import Input from "../../components/Input/Input";

export default function Payment() {
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
        uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/login-page%20(2).png?raw=true",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          style={styles.logo}
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
          }}
          alt="logo"
        />
        {/* Title */}
        <Text style={styles.title}>Đăng nhập</Text>
        {/* Input */}
        <View style={styles.inputWrapper}>
          <Input style={styles.input} size="large" placeholder="User name" />
          <Input style={styles.input} size="large" placeholder="Password" />
        </View>
        {/* Button */}
        <View style={styles.buttonWrapper}>
          <ButtonMain
            size="large"
            hasIcon={true}
            iconName={"logo-google"}
            style={styles.button}
            iconPosition={"start"}
          >
            Sign in with Google
          </ButtonMain>
          <ButtonMain
            size="largeOnlyIcon"
            hasIcon={true}
            style={styles.button}
            iconName={"logo-facebook"} // Đảm bảo tên icon là đúng
            iconPosition={"start"}
          />
          <ButtonMain
            size="largeOnlyIcon"
            hasIcon={true}
            style={styles.button}
            iconName={"logo-twitter"} // Đảm bảo tên icon là đúng
            iconPosition={"start"}
          />
        </View>
        {/* Link */}

        {/* Link */}
        <View style={styles.textLinkWrapperTop}>
          <Pressable onPress={() => alert("Go to sign up")}>
            <Text style={styles.textLink}>Sign up</Text>
          </Pressable>
          <Pressable onPress={() => alert("Forgot password")}>
            <Text style={styles.textLink}>Forgot password?</Text>
          </Pressable>
        </View>
        <View style={styles.textLinkWrapperBottom}>
          <Pressable onPress={() => alert("Visiting guest")}>
            <Text style={styles.textLink}>Like a visiting guest</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
