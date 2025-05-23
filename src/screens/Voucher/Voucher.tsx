import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";
import { customStyles } from "./Voucher.style";
import { RootStackParamList } from "../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addVoucher } from "../../redux/cart/cart.slice";

type VoucherScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Voucher"
>;

const { width } = Dimensions.get("window");

const vouchers = [
  {
    id: "1",
    title: "Giảm 20% toàn menu",
    description: "Áp dụng đến 30/06",
    colors: ["#FF6FD8", "#3813C2"],
  },
  {
    id: "2",
    title: "Freeship cho đơn từ 50K",
    description: "Chỉ hôm nay",
    colors: ["#42E695", "#3BB2B8"],
  },
  {
    id: "3",
    title: "Tặng 1 ly khi mua 2",
    description: "Áp dụng tại cửa hàng",
    colors: ["#F7971E", "#FFD200"],
  },
];

export default function Voucher() {
  //
  const navigation = useNavigation<VoucherScreenNavigationProp>();
  //
  const dispatch = useDispatch();
  // lay theme
  const { theme, toggleTheme } = useTheme();
  const styles = customStyles(theme);
  //state
  const [selectedVoucherId, setSelectedVoucherId] = useState<string | null>(
    null
  );
  //Hàm thêm voucher
  const handleAddVoucher = async (title: string, id: string) => {
    try {
      await dispatch(addVoucher(title));
      setSelectedVoucherId(id);
      Alert.alert("Thành công", "Bạn đã nhận voucher!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      console.error("Lấy voucher không thành công");
      Alert.alert("Lỗi", "Không thể nhận voucher, vui lòng thử lại sau.");
    }
  };
  //
  const renderItem = ({ item }: { item: (typeof vouchers)[0] }) => (
    <LinearGradient
      colors={item.colors}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardContent}>
        <Ionicons name="gift" size={32} color="#fff" style={styles.icon} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAddVoucher(item.title, item.id)}
          disabled={selectedVoucherId !== null}
        >
          <Text style={styles.buttonText}>
            {" "}
            {selectedVoucherId === item.id ? "Đã nhận" : "Nhận"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  return (
    <LinearGradient
      colors={["#fddde6", "#ffe7d8", "#fcd9df"]}
      style={styles.background}
    >
      {/* Nút back nằm trong nội dung */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={34} color="brown" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.header}>Voucher Ưu Đãi</Text>
        <FlatList
          data={vouchers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </LinearGradient>
  );
}
