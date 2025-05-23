import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import CusModal from "../../../components/CusModal/CusModal";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../../context/ThemeContext";
import { customStyles } from "./AdminProductList.style";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import {
  fetchProductsThunk,
  deleteProductThunk,
} from "../../../redux/products/products.thunk";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  RootStackParamList,
  Product,
} from "../../../navigation/NavigationService";
import FloatButton from "../../../components/Button/FloatButton/FloatButton";
import Ionicons from "react-native-vector-icons/Ionicons"; // Thêm dòng này

type AdminProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AdminProductList"
>;

export default function AdminProductList() {
  //
  const { theme } = useTheme();
  const styles = customStyles(theme);
  //state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  //
  const navigation = useNavigation<AdminProductListScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchProductsThunk());
    }, [dispatch])
  );
  const deleteProduct = async (id: string) => {
    try {
      dispatch(deleteProductThunk(id));
      setShowSuccessModal(true);
      setDeleteSuccess(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 500);
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm. Vui lòng thử lại");
    }
  };
  const handleDelete = (id: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa sản phẩm này?", [
      { text: "Hủy" },
      {
        text: "Xóa",

        onPress: () => {
          deleteProduct(id);
          dispatch(fetchProductsThunk());
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View
      style={{
        padding: 12,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 60, height: 60, borderRadius: 6 }}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <Text style={styles.textName}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Text>{item.price}₫</Text>
        <Text>{item.discount}</Text>
      </View>

      {/* Nút Sửa và Xóa trong 1 hàng */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductForm", { mode: "edit", product: item })
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#e0f7fa",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 6,
            marginRight: 6,
          }}
        >
          <Ionicons
            name="create-outline"
            size={18}
            color="#00796b"
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: "#00796b" }}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#ffebee",
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 6,
          }}
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color="#c62828"
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: "#c62828" }}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#fddde6", "#ffe7d8", "#fcd9df"]}
      style={styles.background}
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
      <Text style={styles.title}>QUẢN LÝ SẢN PHẨM</Text>

      <View style={styles.buttonWrapper}>
        <FloatButton
          size="largeOnlyIcon"
          hasIcon={true}
          style={styles.button}
          iconName={"add"}
          iconPosition={"start"}
          onPress={() => navigation.navigate("ProductForm", { mode: "create" })}
        />
      </View>
      <FlatList
        style={styles.listWrapper}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      {/* Modal */}
      <CusModal
        visible={showSuccessModal}
        title={deleteSuccess ? "Hoàn thành !" : "Xóa sản phẩm thất bại!"}
        message={
          deleteSuccess ? "Xóa sản phẩm thành công!" : "Vui lòng thử lại!"
        }
      />
    </LinearGradient>
  );
}
