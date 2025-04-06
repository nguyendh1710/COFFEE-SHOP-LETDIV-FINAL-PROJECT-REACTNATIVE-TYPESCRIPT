import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native"; // Navigation

import { customStyles } from "./SignUp.style";
import { useTheme } from "../../../context/ThemeContext";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";

// Schema xác thực
const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tên người dùng"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  address: yup.string(),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

export default function SignUp() {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  // const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = (data: any) => {
    Alert.alert("Đăng ký thành công", `Xin chào, ${data.username}`, [
      {
        text: "OK",
        // onPress: () => navigation.navigate("SignIn"),
      },
    ]);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/login-page%20(2).png?raw=true",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
          }}
        />
        <Text style={styles.title}>Đăng ký</Text>

        <View style={styles.inputWrapper}>
          {/* Các Input */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.inputBox}
                placeholder="User name"
                size="medium"
                value={value}
                onChangeText={onChange}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.inputBox}
                placeholder="Phone number"
                size="medium"
                value={value}
                onChangeText={onChange}
                error={errors.phone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.inputBox}
                placeholder="Address"
                size="medium"
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                style={styles.inputBox}
                placeholder="Email"
                size="medium"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />

          {/* Mật khẩu */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  style={styles.inputBox}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  size="medium"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 10, top: 12 }}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Confirm mật khẩu */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <View>
                <Input
                  style={styles.inputBox}
                  placeholder="Confirm Password"
                  secureTextEntry={!showConfirm}
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  size="medium"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirm(!showConfirm)}
                  style={{ position: "absolute", right: 10, top: 12 }}
                >
                  <Ionicons
                    name={showConfirm ? "eye-off" : "eye"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Nút Gửi */}
        <View style={styles.buttonWrapper}>
          <ButtonMain
            size="large"
            hasIcon={true}
            iconName={"arrow-forward"}
            iconPosition={"end"}
            onPress={handleSubmit(onSubmit)}
          >
            Next
          </ButtonMain>
        </View>
      </View>
    </ImageBackground>
  );
}
