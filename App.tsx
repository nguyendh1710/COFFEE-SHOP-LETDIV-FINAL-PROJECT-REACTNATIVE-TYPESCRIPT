import React, { useEffect, useCallback, useRef } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/navigation/NavigationService";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./src/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  Easing,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./src/components/tab-bar/tab-bar/tab-bar.component";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { setRedirectAfterLogin } from "./src/redux/auth/auth.slice";
import { ThemeProvider } from "./src/context/ThemeContext";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import SignIn from "./src/screens/Auth/SignIn/SignIn";
import Home from "./src/screens/Home/Home";
import Intro from "./src/screens/Intro/Intro";
import Cart from "./src/screens/Cart/Cart";
import Payment from "./src/screens/Payment/Payment";
import PaymentSuccess from "./src/screens/Payment/PaymentSuccess/PaymentSuccess";
import ProductDetail from "./src/screens/ProductDetail/ProductDetail";
import SignUp from "./src/screens/Auth/SignUp/SignUp";
import AdminProductList from "./src/screens/Admin/AdminProductList/AdminProductList";
import ProductForm from "./src/screens/Admin/ProductForm/ProductForm";
import Voucher from "./src/screens/Voucher/Voucher";

// Stack điều hướng cho Cart tab
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Stack chỉ cho Home tab
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerTitle: () => (
        <Image
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
          }}
          style={{
            width: 120,
            height: 80,
            marginTop: 60,
            resizeMode: "contain",
          }}
        />
      ),
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "#ffffff",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: "#ccc",
      },
      headerTintColor: "#333",
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={{
        title: "Trang chủ",
        headerShown: true,
        headerLeft: () => null,
        gestureEnabled: false,
      }}
    />
  </HomeStack.Navigator>
);

// Tạo CartWrapper để redirect

const CartWrapper = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        navigation.replace("SignIn", { redirectTo: "Cart" });
      }
    }, [isLoggedIn, navigation])
  );

  return isLoggedIn ? <Cart /> : null;
};

//Tạo VoucherWrapper để redirect
const VoucherWrapper = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      if (!isLoggedIn) {
        dispatch(setRedirectAfterLogin("Voucher"));
        navigation.replace("SignIn");
      }
    }, [isLoggedIn, navigation, dispatch])
  );

  return isLoggedIn ? <Voucher /> : null;
};

//component icon custom với hiệu ứng
const HeartbeatVoucherIcon = ({ focused }: { focused: boolean }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        shadowColor: "#ff4d4f",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
      }}
    >
      <LinearGradient
        colors={["#FF6FD8", "#3813C2"]}
        style={{
          borderRadius: 30,
          padding: 8,
        }}
      >
        <Ionicons
          name="gift-outline"
          size={focused ? 34 : 28}
          color={focused ? "#fff" : "#f2f2f2"}
        />
      </LinearGradient>
    </Animated.View>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // xóa tất cả thông báo thừa
  LogBox.ignoreAllLogs(true);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false, animation: "none" }}
            >
              <Stack.Screen
                name="Intro"
                component={Intro as React.ComponentType<any>}
              />
              <Stack.Screen name="Main" component={MainTabs} />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail as React.ComponentType<any>}
              />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="Cart" component={CartWrapper} />
              <Stack.Screen
                name="Payment"
                component={Payment as React.ComponentType<any>}
              />
              <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
              <Stack.Screen
                name="AdminProductList"
                component={AdminProductList}
              />
              <Stack.Screen name="ProductForm" component={ProductForm} />
              <Stack.Screen name="Voucher" component={VoucherWrapper} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}
// bottom tab
const MainTabs = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          animation: "none", // tắt hiệu ứng để chuyển các bottom tab nhanh hơn
        }}
        tabBar={TabBar}
      >
        <Tab.Screen
          name="Trang chủ"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "Trang chủ",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name="home-outline"
                size={size ?? 28}
                color={focused ? "#8F7D5E" : "#495257"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Voucher"
          component={VoucherWrapper}
          options={{
            tabBarLabel: "Voucher",
            tabBarIcon: ({ focused }) => (
              <HeartbeatVoucherIcon focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Giỏ hàng"
          component={CartWrapper}
          options={{
            tabBarLabel: "Giỏ hàng",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name="cart-outline"
                size={size ?? 28}
                color={focused ? "#8F7D5E" : "#495257"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
