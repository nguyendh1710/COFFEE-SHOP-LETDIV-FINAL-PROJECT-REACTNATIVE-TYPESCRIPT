import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  FlatList,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { customStyles } from "./Cart.style";
import { useTheme } from "./../../context/ThemeContext";
import ButtonMain from "../../components/Button/ButtonMain/ButtonMain";
import { RootState, AppDispatch } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  clearVoucher,
  CartItem,
} from "../../redux/cart/cart.slice";
import {
  syncCartToServer,
  fetchCartByUser,
} from "./../../redux/cart/cart.thunk";
import { navigationRef } from "../../navigation/NavigationService";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";

type CartScreenNavigationProp = StackNavigationProp<RootStackParamList, "Cart">;
type CartScreenRouteProp = RouteProp<RootStackParamList, "Cart">;

export default function Cart() {
  // dieu huong nut back
  const route = useRoute<CartScreenRouteProp>();
  const fromPayment = route.params?.fromPayment;

  //
  const { theme } = useTheme();
  const styles = customStyles(theme);
  //state
  const [selectedProductArr, setSelectedProductArr] = useState<CartItem[]>([]);
  const [token, setToken] = useState<string | null>(null);
  //
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);
  console.log("giỏ hàng của người dùng", cart);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const voucher = useSelector((state: RootState) => state.cart.voucher);
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const navigation = useNavigation<CartScreenNavigationProp>();
  // Lấy token từ AsyncStorage khi component mount
  useEffect(() => {
    AsyncStorage.getItem("token").then(setToken);
  }, []);
  // Khi đăng nhập và có userId, fetch cart từ server
  useFocusEffect(
    React.useCallback(() => {
      if (isLoggedIn && user?.id && cart.length === 0) {
        dispatch(fetchCartByUser(user.id));
      }
    }, [isLoggedIn, user?.id, cart.length])
  );
  // đồng bộ lên server khi focus lại component Cart
  // useEffect(() => {
  //   if (isLoggedIn && user?.id) {
  //     dispatch(syncCartToServer({ userId: user.id, cartItems: cart }));
  //   }
  // }, [cart, isLoggedIn, user?.id]);
  // Nếu chưa đăng nhập, điều hướng về SignIn
  useEffect(() => {
    if (!isLoggedIn && navigationRef.isReady()) {
      navigationRef.navigate("SignIn");
    }
  }, [isLoggedIn]);

  // Cập nhật số lượng sản phẩm trong giỏ
  const updateQuantity = (id: string, change: number) => {
    if (change > 0) {
      dispatch(increaseQuantity(id));
    } else {
      dispatch(decreaseQuantity(id));
    }
  };
  // Xóa 1 sản phẩm trong giỏ
  const removeItem = (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          dispatch(removeFromCart(id));
        },
      },
    ]);
  };
  // Xóa tất cả sản phẩm trong giỏ
  const handleClearAllCart = () => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa tất cả sản phẩm?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          dispatch(clearCart());
          setSelectedProductArr([]);
        },
      },
    ]);
  };
  // Chọn / bỏ chọn sản phẩm để thanh toán
  const handleSelectProductFromCart = (product: CartItem) => {
    setSelectedProductArr((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };
  // Tính tổng tiền sản phẩm đã chọn (áp dụng giảm giá nếu có)
  const totalPrice = useMemo(() => {
    return selectedProductArr.reduce((total, item) => {
      const rawDiscount =
        typeof item.discount === "string"
          ? parseFloat(item.discount.replace("%", "")) || 0
          : item.discount || 0;
      const finalPrice = item.price * item.quantity * (1 - rawDiscount / 100);
      return total + finalPrice;
    }, 0);
  }, [selectedProductArr]);
  // Xử lý thanh toán
  const handleConfirm = async () => {
    if (selectedProductArr.length === 0) {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn ít nhất một sản phẩm để đặt hàng !"
      );
      return;
    }
    navigation.navigate("Payment", {
      total: totalPrice,
      items: selectedProductArr,
    });

    setSelectedProductArr([]);
  };
  // Render item trong FlatList
  const renderCartItem = ({ item }: { item: CartItem }) => {
    const discount = Number(item.discount) || 0;
    const finalPrice = item.price * (1 - discount / 100);
    const totalItemPrice = finalPrice * item.quantity;
    const isSelected = selectedProductArr.some((p) => p.id === item.id);

    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
          <Text style={styles.itemType}>Loại: {item.type}</Text>
          <Text style={styles.itemPrice}>
            Đơn giá: {item.price.toFixed(2)} VND
            {discount > 0 && ` (Giảm ${discount}%)`}
          </Text>
          <Text style={styles.itemPrice}>Giảm: {item.discount}</Text>
          <Text style={styles.itemTotal}>
            Thành tiền: {totalItemPrice.toFixed(2)} VND
          </Text>

          <View style={styles.quantityContainer}>
            <ButtonMain
              size="largeOnlyIcon"
              hasIcon={true}
              style={styles.button}
              iconName={"remove"}
              iconPosition={"start"}
              onPress={() => updateQuantity(item.id, -1)}
            />
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <ButtonMain
              size="largeOnlyIcon"
              hasIcon={true}
              style={styles.button}
              iconName={"add"}
              iconPosition={"start"}
              onPress={() => updateQuantity(item.id, 1)}
            />
          </View>

          <View style={styles.boxButton}>
            <ButtonMain
              variant="outlined"
              size="largeOnlyIcon"
              hasIcon={true}
              style={[
                styles.removeButton,
                { backgroundColor: "#977720", borderColor: "#827a08" },
              ]}
              iconName={"trash-outline"}
              iconPosition={"start"}
              onPress={() => removeItem(item.id)}
            />
            <ButtonMain
              variant="outlined"
              size="medium"
              hasIcon={true}
              disabled={isSelected}
              style={[
                styles.removeButton,
                { backgroundColor: "#35390c", borderColor: "#827a08" },
              ]}
              iconName={"bag-check-outline"}
              iconPosition={"start"}
              onPress={() => handleSelectProductFromCart(item)}
            >
              {isSelected ? "Đã chọn" : "Chọn"}
            </ButtonMain>
          </View>
        </View>
      </View>
    );
  };
  // xóa voucher khi người dùng đăng xuất
  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(clearVoucher());
    }
  }, [isLoggedIn]);

  // Animation cho voucher
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const iconAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (voucher) {
      iconAnim.setValue(1);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(iconAnim, {
              toValue: 1.25,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
              toValue: 1.1,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(iconAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }
  }, [voucher]);

  return (
    <LinearGradient
      colors={["#fddde6", "#e4ffd8", "#fcd9df"]}
      style={styles.background}
    >
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
          <TouchableOpacity
            onPress={() => {
              if (fromPayment) {
                // Nếu từ Payment back về Cart, bấm back tiếp sẽ về Main luôn
                navigation.navigate("Main");
              } else if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("Main");
              }
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={34} color="brown" />
          </TouchableOpacity>

          <Text style={styles.title}>Giỏ Hàng</Text>

          {voucher && (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                marginVertical: 20,
              }}
            >
              <LinearGradient
                colors={["#FF0080", "#7928CA", "#2AFADF"]}
                style={[
                  styles.voucherContainer,
                  {
                    borderRadius: 16,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    shadowColor: "#FF0080",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.5,
                    shadowRadius: 10,
                    elevation: 10,
                  },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={[styles.row, { alignItems: "center" }]}>
                  <Animated.View style={{ transform: [{ scale: iconAnim }] }}>
                    <Ionicons
                      name="gift"
                      size={30}
                      color="#fff"
                      style={{ marginRight: 12 }}
                    />
                  </Animated.View>
                  <Text
                    style={[
                      styles.text,
                      { color: "#fff", fontWeight: "bold", fontSize: 16 },
                    ]}
                  >
                    {voucher}
                  </Text>
                </View>
              </LinearGradient>
            </Animated.View>
          )}

          {cart.length > 0 && (
            <View style={styles.removeAllButtonWrapper}>
              <ButtonMain
                variant="outlined"
                size="largeOnlyIcon"
                hasIcon={true}
                style={{ backgroundColor: "#727124", borderColor: "#859f4d" }}
                iconName={"trash"}
                iconPosition={"start"}
                onPress={handleClearAllCart}
              />
            </View>
          )}

          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />

          {selectedProductArr.length > 0 && (
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>
                Tổng cộng: {totalPrice.toFixed(2)} VND
              </Text>
              <ButtonMain
                variant="contained"
                style={[
                  styles.checkoutButton,
                  { backgroundColor: "#bd4515", borderColor: "#969016" },
                ]}
                onPress={handleConfirm}
              >
                Đặt hàng
              </ButtonMain>
            </View>
          )}
        </View>
        {/*Hiển thị loading overlay nếu loading = true */}
        {loading && (
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
            <Text style={{ color: "#fff", marginTop: 10 }}>Đang xử lý...</Text>
          </View>
        )}
      </ImageBackground>
    </LinearGradient>
  );
}
