import React, { FC, useCallback, useState } from "react";
import { Text, View, Image, ViewStyle, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../navigation/NavigationService";
import { useTheme } from "../../../context/ThemeContext";
import { customStyles } from "./ProductItem.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addToCart } from "../../../redux/cart/cart.slice";
import Rating from "../../../components/Rating/Rating";
import Ionicons from "react-native-vector-icons/Ionicons";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";

type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  discount: string;
  profit: string;
  source: string;
  way: string;
  image: string;
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProductItem">;

type ProductItemProps = {
  item: Product;
  style?: ViewStyle | ViewStyle[];
  onSetShowSuccessModal?: (visible: boolean) => void;
};

const ProductItem: FC<ProductItemProps> = ({
  item,
  style,
  onSetShowSuccessModal,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const styles = customStyles(theme);

  const [liked, setLiked] = useState(false);

  // Dùng useCallback để tránh tạo lại hàm mỗi lần render
  const handleBuyNow = useCallback(async () => {
    // Hiển thị modal NGAY khi nhấn
    requestAnimationFrame(() => {
      onSetShowSuccessModal?.(true);
    });

    // Tự động ẩn modal sau 500ms (nên là 0.5s để người dùng thấy rõ)
    setTimeout(() => {
      onSetShowSuccessModal?.(false);
    }, 300);
    // Nếu chưa đăng nhập thì điều hướng ngay sau đó (vẫn cho hiện modal trong vài trăm ms đầu)
    if (!isLoggedIn) {
      navigation.navigate("SignIn");
      return;
    }

    //xử lý thêm vào giỏ hàng ngầm-> thêm sản phẩm vào giỏ hàng (không chờ đợi, để không chặn giao diện)
    dispatch(addToCart({ ...item, quantity: 1, userId }));
  }, [dispatch, isLoggedIn, navigation, item, userId, onSetShowSuccessModal]);

  const handleImagePress = useCallback(() => {
    navigation.navigate("ProductDetail", { productSelectDetail: item });
  }, [navigation, item]);

  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={
              item.image?.trim()
                ? { uri: item.image }
                : require("../../../../assets/default-image.png")
            }
            style={styles.mainImage}
          />
        </TouchableOpacity>
        <View style={styles.discountContainer}>
          <View style={styles.discountTextContainer}>
            <Text style={styles.discountText}>- {item.discount}</Text>
          </View>
        </View>
      </View>

      <View style={styles.productInfoContainer}>
        <Text numberOfLines={1} style={styles.productName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text style={styles.priceText}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ
        </Text>
      </View>

      <View style={styles.ratingContainer}>
        <Rating />
      </View>

      <View style={styles.iconConHeartContainer}>
        <TouchableOpacity onPress={toggleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={16}
            color={liked ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <ButtonMain
          size="small"
          hasIcon
          iconName="cart"
          iconPosition="start"
          style={styles.button}
          onPress={handleBuyNow}
        >
          Mua ngay
        </ButtonMain>
      </View>
    </View>
  );
};

// React.memo với hàm so sánh chính xác hơn:
// So sánh shallow equality item, style có thể bỏ qua hoặc thêm nếu style thường thay đổi
export default React.memo(
  ProductItem,
  (prev, next) =>
    prev.item.id === next.item.id &&
    prev.item.price === next.item.price &&
    prev.item.discount === next.item.discount &&
    prev.style === next.style // Nếu style thay đổi thường thì bỏ dòng này
);
