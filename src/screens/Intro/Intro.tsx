import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Switch,
  ImageBackground,
} from "react-native";
import { customStyles } from "./Intro.style";
import { useTheme } from "./../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import ButtonMain from "../../components/Button/ButtonMain/ButtonMain";

export default function Intro() {
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
        uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Intro/login-page.png?raw=true",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      {/*  dong tat ca noi dung chinh trong container co padding de tranh tran vien */}
      <View style={styles.container}>
        {/*  button doi theme */}
        <View style={styles.themeContainer}>
          {isEnableLight ? (
            <Ionicons
              style={styles.iconLeft}
              name="moon"
              size={20}
              color="black"
            />
          ) : (
            <Ionicons
              style={styles.iconRight}
              name="bulb"
              size={20}
              color="black"
            />
          )}
          <Switch
            trackColor={{ false: "#FAF0F0", true: "#FAF0F0" }} // Màu của track khi bật/tắt
            thumbColor={isEnableLight ? "#855B44" : "#855B47"} // Màu của nút gạt
            onValueChange={toggleTheme} // Hàm callback khi chuyển đổi
            value={isEnableLight} // Trạng thái hiện tại của Switch
          />
        </View>
        {/* button next*/}
        <View style={styles.buttonWrapper}>
          <ButtonMain
            size="large"
            hasIcon={true}
            iconName={"arrow-forward"}
            iconPosition={"end"}
            style={styles.button}
          >
            Next
          </ButtonMain>
        </View>
      </View>
    </ImageBackground>
  );
}
