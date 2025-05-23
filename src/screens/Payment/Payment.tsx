import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { customStyles } from "./Payment.style";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/NavigationService";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/cart/cart.slice";
import { syncCartToServer } from "../../redux/cart/cart.thunk";
import { RootState, AppDispatch } from "../../redux/store";
import Dropdown from "./../../components/Dropdow/Dropdown";

type PaymentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Payment">;
  route: RouteProp<RootStackParamList, "Payment">;
};

const paymentMethods = [
  {
    label: "Thanh toán khi nhận hàng",
    value: "cod", // phai dat ten key nay co dinh la value de dropdow xu ly
    icon: "cash-outline",
  },
  {
    label: "Chuyển khoản ngân hàng",
    value: "bank_transfer", // phai dat ten key nay co dinh la value de dropdow xu ly
    icon: "swap-horizontal-outline",
  },
  {
    label: "Thẻ tín dụng",
    value: "credit_card", // phai dat ten key nay co dinh la value de dropdow xu ly
    icon: "card-outline",
  },
];

const banks = [
  {
    label: "Vietcombank",
    value: "vietcombank", // phai dat ten key nay co dinh la value de dropdow xu ly
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/Logo-ngang-hang-vietcombank.png?raw=true",
    isImage: true,
  },
  {
    label: "Techcombank",
    value: "Techcombank", // phai dat ten key nay co dinh la value de dropdow xu ly
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/logo-techcombank-inkythuatso-10-15-11-46.jpg?raw=true",
    isImage: true,
  },
  {
    label: "VietinBank",
    value: "vietinbank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/vietinbank-logo-png_seeklogo-286951.png?raw=true",
    isImage: true,
  },
  {
    label: "AgriBank",
    value: "AgriBank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/agribank-logo-png_seeklogo-382741.png?raw=true",
    isImage: true,
  },
  {
    label: "HongleonBank",
    value: "HongleonBank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/d4445a1e9dbf79a07f6e79a0e1206989.jpg?raw=true",
    isImage: true,
  },
  {
    label: "LienVietBank",
    value: "LienVietBank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/lien-viet1.jpg?raw=true",
    isImage: true,
  },
  {
    label: "VPBank",
    value: "VPBank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/vpbank-logo-inkythuatso-01-10-11-16-30.jpg?raw=true",
    isImage: true,
  },
  {
    label: "VieTinBank",
    value: "vieTinbank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/vietinbank-logo-png_seeklogo-286951.png?raw=true",
    isImage: true,
  },
  {
    label: "KienLongBank",
    value: "KienLongBank",
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/KienLongBank-Logo.png?raw=true",
    isImage: true,
  },
];

const shippingMethods = [
  {
    label: "Grab Food",
    value: "Grab Food", // phai dat ten key nay co dinh la value de dropdow xu ly
    price: 100000,
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/Logo%20Grab%20Food.png?raw=true",
    isImage: true,
  },
  {
    label: "Giao hàng tiết kiệm (GHTK)",
    value: "ghtk", // phai dat ten key nay co dinh la value de dropdow xu ly
    price: 20000,
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/logo-ghtk-slogan-27-15-24-03.jpg?raw=true",
    isImage: true,
  },
  {
    label: "Ninjavan",
    value: "Ninjavan",
    price: 30000,
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/Ninja-Van-Logo-2048x1152.jpg?raw=true",
    isImage: true,
  },
  {
    label: "JT Express",
    value: "JT Express",
    price: 40000,
    icon: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Payment/JT-Express-Logo.jpg?raw=true",
    isImage: true,
  },
];

export default function Payment({ route, navigation }: PaymentScreenProps) {
  //
  const { theme } = useTheme();
  const styles = customStyles(theme);
  //
  const dispatch = useDispatch<AppDispatch>();
  //
  const [isLoading, setIsLoading] = useState(false); //state loading
  //
  // const {cart:cartItems,voucher} = useSelector((state: RootState) => state.cart);
  // Tối ưu — chỉ re-render nếu đúng phần bạn cần thay đổi:
  const cart = useSelector((state: RootState) => state.cart.cart);
  const voucher = useSelector((state: RootState) => state.cart.voucher);
  const user = useSelector((state: RootState) => state.auth.user);
  //
  const { total, items } = route.params;
  //state
  const [address, setAddress] = useState<string>("");
  const [paymentSelect, setPaymentSelect] = useState<string | null>(null);
  const [bank, setBank] = useState<string | null>(null);
  const [shipping, setShipping] = useState<string | null>(null);
  const [shippingPrice, setShippingPrice] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string | undefined>(
    voucher ?? undefined
  );
  const [note, setNote] = useState("");
  //
  // Đồng bộ 1 lần khi user?.address có (chỉ khi mount component)
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user?.address]);
  //

  const handlePayment = async () => {
    // Đặt loading lên đầu để đảm bảo nó render ngay
    setIsLoading(true);
    //
    if (!paymentSelect) {
      Alert.alert("Thông báo", "Vui lòng chọn phương thức thanh toán.");
      return;
    }
    if (paymentSelect === "bank_transfer" && !bank) {
      Alert.alert("Thông báo", "Vui lòng chọn ngân hàng.");
      return;
    }
    if (!shipping) {
      Alert.alert("Thông báo", "Vui lòng chọn phương thức vận chuyển.");
      return;
    }

    const methodName = paymentMethods.find(
      (i) => i.value === paymentSelect
    )?.label;
    const bankName =
      paymentSelect === "bank_transfer"
        ? banks.find((b) => b.value === bank)?.label ?? null
        : null;
    const shippingName = shippingMethods.find(
      (s) => s.value === shipping
    )?.label;

    const infoCheckout = {
      methodName,
      bankName,
      shippingName,
      promoCode,
      note,
    };

    try {
      // Chỉ đồng bộ lại giỏ hàng với phần còn lại (sau khi đã thanh toán)
      const remainingCart = cart.filter(
        (item) => !items.some((i) => i.id === item.id)
      );
      // Đồng bộ giỏ hàng lên server trước khi điều hướng qua PaymentSuccess -> Gửi phần còn lại lên server
      await dispatch(
        syncCartToServer({ userId: user.id, cartItems: remainingCart })
      ).unwrap();
      // Xóa từng sản phẩm trong Redux (sau khi đồng bộ)
      for (const item of items) {
        dispatch(removeFromCart(item.id));
      }

      // Sau khi đồng bộ thành công, mới điều hướng

      setTimeout(() => {
        navigation.navigate("PaymentSuccess", { infoPayment: infoCheckout });
        setIsLoading(false);
      }, 300); // 300ms là vừa đủ để loading xuất hiện
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Đã xảy ra lỗi khi đồng bộ giỏ hàng. Vui lòng thử lại."
      );
      console.error("Lỗi đồng bộ giỏ hàng:", error);
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#fddde6", "#ffe7d8", "#fcd9df"]}
      style={{ flex: 1 }}
    >
      {/* Nút back nằm trong nội dung */}
      <TouchableOpacity
        onPress={() => navigation.goBack()} //quay lại Cart cũ thay vì tạo một Cart mới trong stack tránh đẩy thêm stack cart vào navigation
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={34} color="brown" />
      </TouchableOpacity>
      <Text style={styles.header}>Thanh toán</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Phương thức thanh toán</Text>
        <Dropdown
          items={paymentMethods}
          selectedValue={paymentSelect}
          onSelect={(val) => setPaymentSelect(val)}
        />

        {paymentSelect === "bank_transfer" && (
          <>
            <Text style={styles.title}>Chọn ngân hàng</Text>
            <Dropdown items={banks} selectedValue={bank} onSelect={setBank} />
          </>
        )}

        <Text style={styles.title}>Phương thức vận chuyển</Text>
        <Dropdown
          items={shippingMethods}
          selectedValue={shipping}
          onSelect={(val) => {
            setShipping(val);
            const found = shippingMethods.find((s) => s.value === val);
            setShippingPrice(found?.price ?? null);
          }}
        />
        {shipping && (
          <View>
            <View>
              <Text style={styles.textDes}>
                Phí vận chuyển: {shippingPrice ?? "Không rõ"} VND
              </Text>
            </View>
            <View>
              <Text style={styles.textDes}>Địa chỉ nhận hàng của bạn </Text>

              <TextInput
                style={styles.input}
                placeholder="Địa chỉ nhận hàng của bạn:"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
        )}
        <Text style={styles.title}>Voucher</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mã khuyến mãi"
          value={promoCode}
          onChangeText={setPromoCode}
        />

        <Text style={styles.title}>Ghi chú đơn hàng</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Ví dụ: Giao sau 18h, ít đường, nhiều đá..."
          value={note}
          onChangeText={setNote}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng cộng:</Text>
          <Text style={styles.amount}>{total.toLocaleString()} đ</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
          <Text style={styles.buttonText}>Xác nhận thanh toán</Text>
        </TouchableOpacity>
      </ScrollView>
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
          <Text style={{ color: "#fff", marginTop: 10 }}>Đang xử lý...</Text>
        </View>
      )}
    </LinearGradient>
  );
}
