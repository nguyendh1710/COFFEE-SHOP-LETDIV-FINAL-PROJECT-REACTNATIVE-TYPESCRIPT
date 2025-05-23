import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RootStackParamList } from "./../../../navigation/NavigationService";
import { AppDispatch } from "../../../redux/store";
import { signupThunk } from "../../../redux/auth/auth.thunk";
import { customStyles } from "./SignUp.style";
import { useTheme } from "../../../context/ThemeContext";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";
import CusModal from "../../../components/CusModal/CusModal";
import * as ImagePicker from "expo-image-picker";
import { getAddressByLocation } from "../../../helpers/apis";

type FormValues = {
  userName: string;
  phone: string;
  address?: string;
  email: string;
  passWord: string;
  confirmPassWord: string;
  avatar?: string;
};

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignUp">;
  route: RouteProp<RootStackParamList, "SignUp">;
};

const schema = yup.object().shape({
  userName: yup
    .string()
    .required("Vui lòng nhập tên người dùng")
    .matches(/^\S+$/, "Tên người dùng không được chứa khoảng trắng"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  address: yup.string().optional(),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  passWord: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassWord: yup
    .string()
    .oneOf([yup.ref("passWord")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  avatar: yup.string().optional(),
});

export default function SignUp({ navigation }: SignUpScreenProps) {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userNameSuccess, setUserNameSuccess] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Các useRef thay cho useState lưu input de tranh re render
  const userNameRef = useRef<string>("");
  const phoneRef = useRef<string>("");
  const addressRef = useRef<string>("");
  const emailRef = useRef<string>("");
  const passWordRef = useRef<string>("");
  const confirmPassWordRef = useRef<string>("");

  // react-hook-form để validate và control lỗi, giữ defaultValues để reset
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
      phone: "",
      address: "",
      email: "",
      passWord: "",
      confirmPassWord: "",
      avatar: "",
    },
  });

  // Địa chỉ mặc định lấy từ location (lưu vào ref + setValue form)
  useEffect(() => {
    (async () => {
      const address = await getAddressByLocation(true); // dùng toạ độ giả lập
      console.log("Address lấy được từ GPS:", address);
      addressRef.current = address;

      // Set giá trị vào react-hook-form và đảm bảo cập nhật Input hiển thị
      setValue("address", address, {
        shouldValidate: true,
        shouldDirty: true,
      });
    })();
  }, []);
  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Quyền bị từ chối", "Bạn cần cấp quyền sử dụng camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
      cameraType: ImagePicker.CameraType.front,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatar(uri);
    }
  };

  // Submit handler lấy dữ liệu từ ref và avatar state
  const onSubmitHandler: SubmitHandler<FormValues> = async (formData) => {
    if (isSubmitting) return;
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName.trim());
      formDataToSend.append("phone", formData.phone.trim());
      formDataToSend.append(
        "address",
        formData.address ? formData.address.trim() : ""
      );
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("passWord", formData.passWord);
      formDataToSend.append("confirmPassWord", formData.confirmPassWord);
      formDataToSend.append("role", "customer");

      if (avatar) {
        const filename = avatar.split("/").pop() || "avatar.jpg";
        const match = /\.(\w+)$/.exec(filename ?? "");
        const ext = match ? match[1] : "jpg";
        const type = `image/${ext}`;

        formDataToSend.append("avatar", {
          uri: avatar,
          name: filename,
          type,
        } as any);
      }

      setIsSubmitting(true);
      await dispatch(signupThunk(formDataToSend));
      reset();
      // Lấy tên userName từ formData gốc chứ không phải FormData
      setUserNameSuccess(formData.userName);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigation.navigate("SignIn");
      }, 2500);
    } catch (err) {
      Alert.alert("Thất bại", "Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const onErrorHandler = (errors: any) => {
    console.log("Dữ liệu không hợp lệ:", errors);
  };

  const handleFormSubmit = handleSubmit(onSubmitHandler, onErrorHandler);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/login-page%20(2).png?raw=true",
          }}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate("Main");
                }
              }}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={34} color="brown" />
            </TouchableOpacity>
            <Image
              style={styles.logo}
              source={{
                uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
              }}
            />
            <Text style={styles.title}>Đăng ký</Text>

            <KeyboardAwareScrollView
              enableOnAndroid
              keyboardOpeningTime={0}
              extraScrollHeight={Platform.OS === "ios" ? 100 : 80}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <View style={styles.boxCamera}>
                <TouchableOpacity onPress={openCamera}>
                  {avatar ? (
                    <Image
                      source={{ uri: avatar }}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <View style={styles.iconCamera}>
                      <Ionicons name="camera" size={30} color="#888" />
                    </View>
                  )}
                  <Text style={styles.avatarText}>
                    {avatar ? "Chỉnh sửa ảnh đại diện" : "Chụp ảnh đại diện"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputWrapper}>
                {[
                  {
                    name: "userName",
                    placeholder: "Tên đăng nhập...",
                    error: errors.userName?.message,
                    ref: userNameRef,
                  },
                  {
                    name: "phone",
                    placeholder: "Số điện thoại...",
                    error: errors.phone?.message,
                    ref: phoneRef,
                  },
                  {
                    name: "address",
                    placeholder: "Địa chỉ...",
                    error: errors.address?.message,
                    ref: addressRef,
                  },
                  {
                    name: "email",
                    placeholder: "Email...",
                    error: errors.email?.message,
                    ref: emailRef,
                  },
                  {
                    name: "passWord",
                    placeholder: "Mật khẩu...",
                    isPassword: true,
                    error: errors.passWord?.message,
                    ref: passWordRef,
                  },
                  {
                    name: "confirmPassWord",
                    placeholder: "Nhập lại Mật khẩu...",
                    isPassword: true,
                    error: errors.confirmPassWord?.message,
                    ref: confirmPassWordRef,
                  },
                ].map(({ name, placeholder, error, isPassword, ref }) => (
                  <Controller
                    key={name}
                    control={control}
                    name={name as keyof FormValues}
                    render={({ field }) => {
                      const isPassField = name === "passWord";
                      const isConfirmField = name === "confirmPassWord";
                      const secure = isPassField
                        ? !showPassword
                        : isConfirmField
                        ? !showConfirm
                        : false;
                      const toggleSecure = isPassField
                        ? () => setShowPassword(!showPassword)
                        : isConfirmField
                        ? () => setShowConfirm(!showConfirm)
                        : undefined;
                      return (
                        <View>
                          <Input
                            style={styles.inputBox}
                            placeholder={placeholder}
                            size="medium"
                            // value lấy từ ref
                            value={field.value} // dùng giá trị từ form, không phải ref.current
                            onChangeText={(text) => {
                              ref.current = text;
                              setValue(name as keyof FormValues, text, {
                                shouldValidate: true,
                                shouldDirty: true,
                              });
                            }}
                            error={error}
                            secureTextEntry={isPassword ? secure : false}
                            onSubmitEditing={Keyboard.dismiss}
                            rightIcon={
                              isPassword ? (
                                <TouchableOpacity onPress={toggleSecure}>
                                  <Ionicons
                                    name={secure ? "eye-off" : "eye"}
                                    size={20}
                                    color="gray"
                                  />
                                </TouchableOpacity>
                              ) : undefined
                            }
                          />
                          {error && (
                            <Text style={styles.errorText}>{error}</Text>
                          )}
                        </View>
                      );
                    }}
                  />
                ))}
                <View style={styles.buttonWrapper}>
                  <ButtonMain size="large" onPress={handleFormSubmit}>
                    {isSubmitting ? "Đang gửi..." : " Đăng ký"}
                  </ButtonMain>
                </View>
              </View>
            </KeyboardAwareScrollView>
          </View>
        </ImageBackground>

        <CusModal
          visible={showSuccessModal}
          title={"  Đăng ký thành công!"}
          message={` Chào mừng ${userNameSuccess} đến với DHN Coffee!`}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
