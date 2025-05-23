import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Switch,
  ImageBackground,
  Image,
} from "react-native";
import { customStyles } from "./Intro.style";
import { useTheme } from "./../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../navigation/NavigationService";
import ButtonMain from "../../components/Button/ButtonMain/ButtonMain";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

type IntroScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Intro">;
  route: RouteProp<RootStackParamList, "Intro">;
};

export default function Intro({ navigation }: IntroScreenProps) {
  const { theme, toggleTheme } = useTheme();
  const [isEnableLight, setIsEnableLight] = useState<boolean>(true); // Xác định theme ban đầu

  //
  useEffect(() => {
    // Tự động điều hướng về "Main" sau 3 giây chẳng hạn
    setTimeout(() => {
      navigation.replace("Main");
    }, 700);
  }, []);
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
        {/* <View style={styles.buttonWrapper}>
          <ButtonMain
            size="large"
            hasIcon={true}
            iconName={"arrow-forward"}
            iconPosition={"end"}
            style={styles.button}
            onPress={() => navigation.navigate('Main')}
          >
            Next
          </ButtonMain>
        </View> */}
        <Image
          style={styles.logo}
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/component/TransitionSuccess/b033f4c97648033801ece272d5d1f286.gif?raw=true",
          }}
          alt="logo"
        />
      </View>
    </ImageBackground>
  );
}
