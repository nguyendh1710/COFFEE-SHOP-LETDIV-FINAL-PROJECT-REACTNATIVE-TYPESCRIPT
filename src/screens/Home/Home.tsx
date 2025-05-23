import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  ListRenderItemInfo,
  ActivityIndicator,
  TouchableOpacity,
  Keyboard,
  Platform,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTheme } from "../../context/ThemeContext";
import { customStyles } from "./Home.style";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/Input/Input";
import CusModal from "../../components/CusModal/CusModal";
import ProductItem from "./ProductItem/ProductItem";
import { RouteProp } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  fetchSearchProductsThunk,
} from "../../redux/products/products.thunk";
import { Product } from "../../redux/products/products.slice";
import { clearCart } from "../../redux/cart/cart.slice";
import { syncCartToServer } from "../../redux/cart/cart.thunk";
import { AppDispatch, RootState } from "../../redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/NavigationService";
import { useLayoutEffect } from "react";

const { width } = Dimensions.get("window");

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Main">;
  route: RouteProp<RootStackParamList, "Main">;
};

export default function Home({ route, navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const styles = customStyles(theme);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const searchInputRef = useRef<string>(""); //dùng ref để tránh re-render
  const [searchQuery, setSearchQuery] = useState<string>(""); // dùng để trigger search API
  const [showMenu, setShowMenu] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const inputRef = useRef<string>(""); // Lưu text mà không gây re-render
  const [triggerSearch, setTriggerSearch] = useState(false); // Trigger để gọi API
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  //
  // const { products = [], loading } = useSelector(
  //   (state: RootState) => state.products
  // );
  const products = useSelector((state: RootState) => state.products.products);
  const loading = useSelector((state: RootState) => state.products.loading);
  const cart = useSelector((state: RootState) => state.cart.cart);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center", left: 82 }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              if (user) {
                setShowMenu((prev) => !prev);
              } else {
                navigation.navigate("SignIn");
              }
            }}
          >
            {user?.avatar ? (
              <Image
                source={{ uri: user.avatar }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  marginRight: 8,
                }}
              />
            ) : (
              <Ionicons
                name="person-circle-outline"
                size={40}
                color="gray"
                style={{ marginRight: 8 }}
              />
            )}
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {user?.username ? `Xin chào, ${user.username}` : "Đăng nhập"}
            </Text>
          </TouchableOpacity>

          {user && showMenu && (
            <View
              style={{
                position: "absolute",
                top: 50,
                right: 22,
                backgroundColor: "#fff",
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 4,
                zIndex: 1000,
              }}
            >
              {user.role === "admin" && (
                <TouchableOpacity
                  onPress={() => {
                    setShowMenu(false);
                    navigation.navigate("AdminProductList");
                  }}
                >
                  <Text style={{ padding: 4, fontSize: 16 }}>
                    Trang quản trị
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ padding: 4, fontSize: 16 }}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ),
    });
  }, [navigation, user, showMenu]);

  const handleLogout = async () => {
    setIsLogout(true);
    setShowMenu(false);

    try {
      // Đồng bộ giỏ hàng trước khi logout lần nữa cho chắc
      await dispatch(
        syncCartToServer({ userId: user.id, cartItems: cart })
      ).unwrap();

      // Xóa cart trong Redux sau khi đã đồng bộ
      dispatch(clearCart());

      // Logout
      dispatch({ type: "auth/logout" });

      // Điều hướng
      navigation.replace("SignIn");
    } catch (error) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng xuất. Vui lòng thử lại.");
      console.error("Lỗi đồng bộ giỏ hàng:", error);
    } finally {
      setIsLogout(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      dispatch(fetchSearchProductsThunk(searchQuery));
    } else {
      dispatch(fetchProductsThunk());
    }
  }, [searchQuery, dispatch]);

  const Carousel = (): JSX.Element => {
    const flatListRef = useRef<FlatList<Product>>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (products.length === 0) return;
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % products.length;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }, [products.length]);

    const ITEM_WIDTH = width * 0.9 + 24;

    return (
      <FlatList
        ref={flatListRef}
        data={products}
        horizontal
        pagingEnabled
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: ListRenderItemInfo<Product>) => {
          let imageSource;

          if (typeof item.image === "string" && item.image.trim() !== "") {
            imageSource = { uri: item.image };
          } else if (
            item.image &&
            typeof item.image === "object" &&
            typeof item.image.path === "string" &&
            item.image.path.trim() !== ""
          ) {
            imageSource = {
              uri: `http://192.168.1.4:5000/${item.image.path.replace(
                /\\/g,
                "/"
              )}`,
            };
          } else {
            imageSource = require("../../../assets/default-image.png");
          }

          // Di chuyển kiểm tra vào đây, sau khi đã gán
          if (
            typeof imageSource === "object" &&
            "uri" in imageSource &&
            !imageSource.uri
          ) {
            console.warn("Invalid image uri:", item.image);
          }

          return (
            <Image
              source={imageSource}
              style={{
                width: width * 0.9,
                height: 150,
                marginLeft: 4,
                borderRadius: 10,
                margin: 20,
              }}
              resizeMode="cover"
            />
          );
        }}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          }, 500);
        }}
      />
    );
  };
  const onSearchIconPress = () => {
    const query = inputRef.current.trim();
    if (query) {
      dispatch(fetchSearchProductsThunk(query));
    } else {
      dispatch(fetchProductsThunk());
    }
  };

  const ListHeader = (): JSX.Element => (
    <View>
      <Input
        placeholder="Tìm quán gần nhất..."
        hasIcon={true}
        iconPosition="end"
        iconName={["search", "filter"]}
        value={searchQuery} // controlled value
        onChangeText={(text) => setSearchQuery(text)} // cập nhật state
        onIconPress={onSearchIconPress}
        onSubmitEditing={Keyboard.dismiss}
      />
      <Text style={styles.headerTitle}>Món mới - Ngại gì không thử!</Text>
      <Carousel />
    </View>
  );

  const RenderSection = ({ title }: { title: string }) => {
    const smoothie = products.filter((item) => item.type === "Smoothie");
    const bakery = products.filter((item) => item.type === "Bakery");
    const dish = products.filter((item) => item.type === "Dish");
    const selectTypeSection = () => {
      if (title === "Sinh tố") {
        return smoothie;
      } else if (title === "Bánh") {
        return bakery;
      } else {
        return dish;
      }
    };
    const itemStyle = useMemo(() => styles.item, [theme]);
    return (
      <View>
        <Text style={styles.headerTitle}>{title}</Text>

        <FlatList
          data={selectTypeSection()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                style={itemStyle}
                onSetShowSuccessModal={setShowSuccessModal}
              />
            );
          }}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardOpeningTime={0}
          extraScrollHeight={Platform.OS === "ios" ? 100 : 80}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.container}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{ flex: 1, marginHorizontal: 10, marginTop: 40 }}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              <ListHeader />
              <RenderSection title="Sinh tố" />
              <RenderSection title="Bánh" />
              <RenderSection title="Món ăn khác" />
            </ScrollView>
            {/* Modal đăng xuất*/}
            <Modal visible={isLogout} transparent animationType="fade">
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#fff" />
                <Text style={{ color: "#fff", marginTop: 10 }}>
                  Đang đăng xuất...
                </Text>
              </View>
            </Modal>
          </View>
          {/* Modal thêm sản phẩm vào giỏ hàng thành công*/}
          <CusModal
            visible={showSuccessModal}
            title={"Thành công!"}
            message={` Đã thêm sản phẩm vào giỏ hàng!`}
          />
        </KeyboardAwareScrollView>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
