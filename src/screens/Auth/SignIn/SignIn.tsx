import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ActivityIndicator,
} from "react-native";
import CusModal from "../../../components/CusModal/CusModal";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { customStyles } from "./SignIn.style";
import { useTheme } from "./../../../context/ThemeContext";
import { RootStackParamList } from "./../../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../../redux/auth/auth.thunk";
import { setRedirectAfterLogin } from "../../../redux/auth/auth.slice";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";

// Schema xác thực
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Vui lòng nhập tài khoản")
    .email("Email không hợp lệ"),
  passWord: Yup.string().required("Vui lòng nhập mật khẩu"),
});

type FormValues = {
  email: string;
  passWord: string;
};
type SignInScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "SignIn">;
  route: RouteProp<RootStackParamList, "SignIn">;
};
export default function SignIn({ route, navigation }: SignInScreenProps) {
  //theme
  const { theme, toggleTheme } = useTheme();
  const styles = customStyles(theme); // Truyền theme vào customStyles
  // state
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // modal đăng nhập thành công
  const [userNameSuccess, setUserNameSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false); //state loading
  //
  // const redirectTo = useSelector(
  //   (state: RootState) => state.auth.redirectAfterLogin
  // ) as keyof RootStackParamList | null;
  const redirectTo = useSelector(
    (state: RootState) => state.auth.redirectAfterLogin
  ) as keyof RootStackParamList | null;
  // Điều hướng về Main (tab Home) khi chưa dăng nhập va back về

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      if (!redirectTo) {
        // Ngăn hành vi mặc định và điều hướng về Main
        e.preventDefault();
        navigation.navigate("Main");
      }
      // Nếu có redirectTo thì để back xử lý mặc định (hoặc bạn có thể tùy chỉnh thêm)
    });
    return unsubscribe;
  }, [navigation, redirectTo]);

  //
  // Hàm safeReplace an toàn theo kiểu RootStackParamList
  const safeReplace = (screen: keyof RootStackParamList, params?: any) => {
    switch (screen) {
      case "SignIn":
        navigation.replace(screen, params as RootStackParamList["SignIn"]);
        break;
      case "SignUp":
        navigation.replace(screen, params as RootStackParamList["SignUp"]);
        break;
      case "ProductDetail":
        navigation.replace(
          screen,
          params as RootStackParamList["ProductDetail"]
        );
        break;
      case "ProductForm":
        navigation.replace(screen, params as RootStackParamList["ProductForm"]);
        break;
      case "Payment":
        navigation.replace(screen, params as RootStackParamList["Payment"]);
        break;
      case "PaymentSuccess":
        if (params) {
          navigation.replace(
            screen,
            params as RootStackParamList["PaymentSuccess"]
          );
        } else {
          console.warn("Missing params for PaymentSuccess");
        }
        break;
      // Màn không cần params
      case "Intro":
      case "Main":
      case "Cart":
      case "AdminProductList":
      case "Voucher":
      case "ProductItem":
        navigation.replace(screen);
        break;
      default:
        console.warn("Unknown screen:", screen);
        break;
    }
  };

  // Xử lý form đăng nhập
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const resultAction = await dispatch(loginThunk(data));

      if (loginThunk.fulfilled.match(resultAction)) {
        const { user } = resultAction.payload;

        reset(); // <== reset input form
        setUserNameSuccess(user.username || user.email);
        setShowSuccessModal(true);

        // Hiển thị modal trong 1.5s rồi chuyển trang
        setTimeout(() => {
          setShowSuccessModal(false);
          // Nếu có redirect thì chuyển tới

          if (redirectTo) {
            safeReplace(redirectTo, undefined);
            dispatch(setRedirectAfterLogin(undefined));
          } else {
            if (user.role === "admin") {
              navigation.navigate("AdminProductList");
            } else if (user.role === "customer") {
              navigation.replace("Cart");
            } else {
              navigation.replace("Main");
            }
          }
        }, 1000);
      } else if (loginThunk.rejected.match(resultAction)) {
        const errorMessage =
          resultAction.payload ||
          resultAction.error?.message ||
          "Đăng nhập thất bại";
        alert(errorMessage);
      }
    } catch (err) {
      alert("Lỗi không xác định khi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

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
          <KeyboardAwareScrollView
            enableOnAndroid
            keyboardOpeningTime={0}
            extraScrollHeight={Platform.OS === "ios" ? 100 : 80}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.container}
          >
            {/* Nút back nằm trong nội dung */}
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
            {/* Logo */}
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={{
                  uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
                }}
                alt="logo"
              />
            </View>
            {/* Title */}
            <Text style={styles.title}>Đăng nhập</Text>
            {/* Input */}

            <View style={styles.inputWrapper}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    style={styles.input}
                    size="medium"
                    placeholder="Email..."
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={Keyboard.dismiss}
                  />
                )}
              />
              {errors.email && (
                <Text style={{ color: "red" }}>{errors.email.message}</Text>
              )}

              <Controller
                control={control}
                name="passWord"
                render={({ field: { onChange, value } }) => (
                  <Input
                    style={styles.input}
                    size="medium"
                    placeholder="Password..."
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                    onSubmitEditing={Keyboard.dismiss}
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => setShowPassword((prev) => !prev)}
                      >
                        <Ionicons
                          name={showPassword ? "eye" : "eye-off"}
                          size={20}
                          color="gray"
                        />
                      </TouchableOpacity>
                    }
                  />
                )}
              />
              {errors.passWord && (
                <Text style={{ color: "red" }}>{errors.passWord.message}</Text>
              )}
              {/* nút đăng nhập */}
              <View style={styles.buttonWrapperSignin}>
                <ButtonMain
                  size="large"
                  hasIcon={true}
                  iconName={"arrow-forward"}
                  iconPosition={"end"}
                  onPress={handleSubmit(onSubmit)}
                >
                  Đăng nhập
                </ButtonMain>
              </View>
            </View>

            {/* nút khác */}
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
                iconName={"logo-facebook"}
                iconPosition={"start"}
              />
              <ButtonMain
                size="largeOnlyIcon"
                hasIcon={true}
                style={styles.button}
                iconName={"logo-twitter"}
                iconPosition={"start"}
              />
            </View>

            {/* Link */}
            <View style={styles.textLinkWrapperTop}>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.textLink}>Đăng ký</Text>
              </Pressable>
              <Pressable onPress={() => alert("Forgot password")}>
                <Text style={styles.textLink}>Quên mật khẩu?</Text>
              </Pressable>
            </View>
            <View style={styles.textLinkWrapperBottom}>
              <Pressable onPress={() => alert("Visiting guest")}>
                <Text style={styles.textLink}>Chế độ khách</Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
        {/*Hiển thị loading overlay nếu isLoading = true */}
        {isLoading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
              zIndex: 1000,
            }}
          >
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ color: "#fff", marginTop: 10 }}>
              Đang đăng nhập...
            </Text>
          </View>
        )}
        {/* Modal */}

        <CusModal
          visible={showSuccessModal}
          title={"Đăng nhập thành công!"}
          message={` Chào mừng ${userNameSuccess} quay lại với DHN Coffee!`}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
