import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart/cart.slice";
import { syncCartToServer } from "../../redux/cart/cart.thunk";
import { RootState, AppDispatch } from "../../redux/store";
import { RouteProp } from "@react-navigation/native";
import { useTheme } from "../../context/ThemeContext";
import FloatButton from "../../components/Button/FloatButton/FloatButton";
import ButtonMain from "../../components/Button/ButtonMain/ButtonMain";
import { customStyles } from "./ProductDetail.style";

// Kiểu dữ liệu của sản phẩm

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
  image: string;
  userId: string;
}

// Định nghĩa kiểu cho props màn hình ProductDetail
type ProductDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "ProductDetail">;
  route: RouteProp<RootStackParamList, "ProductDetail">;
};

export default function ProductDetail({
  route,
  navigation,
}: ProductDetailScreenProps) {
  // Lấy thông tin chi tiết sản phẩm từ params
  const { productSelectDetail } = route.params;
  // kiểm tra đã đăng nhập chưa

  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const parsedDiscount =
    parseFloat(productSelectDetail.discount.replace("%", "")) || 0;
  const handleAddToCart = (product: CartItem) => {
    if (!isLoggedIn) {
      navigation.navigate("SignIn");
      return;
    }

    dispatch(addToCart(product));

    // Đồng bộ cart lên backend nếu đã đăng nhập
    if (user && isLoggedIn) {
      dispatch(
        syncCartToServer({
          userId: user.id,
          cartItems: [...cartItems, product],
        })
      );
    }

    navigation.navigate("Cart");
  };
  // lay theme
  const { theme, toggleTheme } = useTheme();
  const styles = customStyles(theme);
  // Anomation logo
  const [scale] = useState(new Animated.Value(1));
  // Sử dụng useEffect để khởi động animation khi component được mount
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2, // Phóng to lên 1.2 lần kích thước ban đầu
          duration: 1500, // Thời gian phóng to
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // Thu nhỏ về kích thước ban đầu
          duration: 1500, // Thời gian thu nhỏ
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scale]);

  // Tải chi tiết sản phẩm nếu cần thiết (ví dụ sử dụng Redux hoặc API)
  useEffect(() => {
    // Dispatch hoặc gọi API để tải chi tiết sản phẩm dựa trên productSelectDetail.id
  }, [productSelectDetail]);

  return (
    <ImageBackground
      source={{
        uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/ProductDetail/sub-menu.png?raw=true",
      }}
      style={styles.background}
      resizeMode="cover"
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
      <Animated.Image
        style={[
          styles.logo,
          { transform: [{ scale }] }, // Áp dụng hiệu ứng phóng to/thu nhỏ
        ]}
        source={{
          uri: productSelectDetail.image,
        }}
        alt="logo"
      />

      <ScrollView style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.textType}>
            Phân loại: {productSelectDetail.type}
          </Text>
          <Text style={styles.titleProfit}>
            Sự hấp dẫn của{" "}
            {productSelectDetail.name.charAt(0).toUpperCase() +
              productSelectDetail.name.slice(1)}
          </Text>

          <Text style={styles.textProfit}>{productSelectDetail.profit}</Text>
          <Text style={styles.titleWay}>
            Công thức làm{" "}
            {productSelectDetail.name.charAt(0).toUpperCase() +
              productSelectDetail.name.slice(1)}
          </Text>
          <Text style={styles.subTitleWay}>
            Nguyên liệu làm{" "}
            {productSelectDetail.name.charAt(0).toUpperCase() +
              productSelectDetail.name.slice(1)}
          </Text>
          <Text style={styles.textWaySource}>{productSelectDetail.source}</Text>
          <Text style={styles.subTitleWay}>
            Cách làm{" "}
            {productSelectDetail.name.charAt(0).toUpperCase() +
              productSelectDetail.name.slice(1)}
          </Text>
          <Text style={styles.textProfit}>{productSelectDetail.way}</Text>
        </View>
      </ScrollView>

      {/* Nút nổi cố định */}
      <View style={styles.buttonWrapper}>
        <FloatButton
          size="largeOnlyIcon"
          hasIcon={true}
          style={styles.button}
          iconName={"chatbox-ellipses-outline"}
          iconPosition={"start"}
          // onPress={() => navigation.navigate("Payment")}
        ></FloatButton>
      </View>
      {/* Nút tư vấn */}
      <View style={styles.buttonSellerWrapper}>
        <ButtonMain
          size="medium"
          hasIcon={true}
          style={styles.button}
          iconName={"cart"}
          iconPosition={"start"}
          onPress={() =>
            handleAddToCart({
              id: productSelectDetail.id,
              name: productSelectDetail.name,
              type: productSelectDetail.type,
              price: Number(productSelectDetail.price),
              quantity: 1,
              image: productSelectDetail.image,
              discount: productSelectDetail.discount || "0",
              userId: user?.id || "",
            })
          }
        >
          Đặt hàng
        </ButtonMain>
      </View>
    </ImageBackground>
  );
}
