import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { AppDispatch } from "../../../redux/store";
import CusModal from "../../../components/CusModal/CusModal";
import ButtonMain from "../../../components/Button/ButtonMain/ButtonMain";
import Input from "../../../components/Input/Input";
import { useTheme } from "../../../context/ThemeContext";
import { customStyles } from "./ProductForm.style";
import {
  createProductThunk,
  fetchPatchProductThunk,
} from "../../../redux/products/products.thunk";
import {
  RootStackParamList,
  Product,
} from "../../../navigation/NavigationService";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { HOST } from "../../../helpers/fetcher";

type ImageUploadData =
  | string
  | {
      path: string;
      filename: string;
      originalname: string;
    };
export interface ProductInput {
  name: string;
  type: string;
  price: number;
  discount: string;
  profit: string;
  source: string;
  way: string;
  image: ImageUploadData;
}

type ProductFormScreenRouteProp = RouteProp<RootStackParamList, "ProductForm">;

export default function ProductForm() {
  const { theme } = useTheme();
  const styles = customStyles(theme);

  const route = useRoute<ProductFormScreenRouteProp>();
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const editing = route.params.mode === "edit";
  const product = editing ? route.params.product : null;

  // Dùng ref thay vì useState để tránh re-render
  const nameRef = useRef(product?.name || "");
  const priceRef = useRef(product?.price?.toString() || "");
  const discountRef = useRef(product?.discount || "");
  const profitRef = useRef(product?.profit || "");
  const sourceRef = useRef(product?.source || "");
  const wayRef = useRef(product?.way || "");

  const [type, setType] = useState(product?.type || "");
  const [image, setImage] = useState(product?.image || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!nameRef.current || !priceRef.current || !image) {
      Alert.alert("Thiếu thông tin", "Hãy nhập đầy đủ tên, giá và ảnh");
      return;
    }

    setIsSubmitting(true);

    let imageData: ImageUploadData = image;
    if (typeof image === "string") {
      if (image.startsWith("http")) {
        // Nếu là URL full, lấy path tương đối, filename
        const path = image.replace(`${HOST}/`, "").replace(/\\/g, "/");
        const filename = path.split("/").pop() || "";
        imageData = {
          path,
          filename,
          originalname: filename,
        };
      } else if (image.startsWith("file://")) {
        // Nếu là ảnh local (chụp từ camera)
        imageData = image; // giữ nguyên URI để backend xử lý upload
      }
    }
    const payload = {
      name: nameRef.current,
      type,
      price: Number(priceRef.current),
      discount: discountRef.current,
      profit: profitRef.current,
      source: sourceRef.current,
      way: wayRef.current,
      image: imageData,
    };

    try {
      if (editing && product) {
        await dispatch(
          fetchPatchProductThunk({
            productId: product.id,
            updatedData: payload,
          })
        );
      } else {
        await dispatch(createProductThunk(payload));
      }
      setShowSuccessModal(true);
      setTimeout(() => {
        if (!editing) {
          // Reset các ref và state về mặc định
          nameRef.current = "";
          priceRef.current = "";
          discountRef.current = "";
          profitRef.current = "";
          sourceRef.current = "";
          wayRef.current = "";
          setImage("");
          setType("");
        }
        setShowSuccessModal(false);
        navigation.goBack();
      }, 2000);
    } catch (error) {
      console.error("Error submitting product:", error);
      Alert.alert("Lỗi", "Không thể gửi dữ liệu sản phẩm");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Cần quyền", "Hãy cấp quyền để sử dụng camera");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#fddde6", "#ffe7d8", "#fcd9df"]}
        style={styles.background}
      >
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

        <View style={styles.logoWrapper}>
          <Image
            style={styles.logo}
            source={{
              uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
            }}
          />
        </View>

        <Text style={styles.title}>
          {editing ? "CẬP NHẬT" : "THÊM MỚI"} SẢN PHẨM
        </Text>

        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.boxCamera}>
            <TouchableOpacity onPress={openCamera}>
              {image ? (
                <Image source={{ uri: image }} style={styles.imageImage} />
              ) : (
                <View style={styles.iconCamera}>
                  <Ionicons name="camera" size={30} color="#888" />
                </View>
              )}
              <Text style={styles.imageText}>
                {image ? "Chỉnh sửa ảnh sản phẩm" : "Chụp ảnh sản phẩm"}
              </Text>
            </TouchableOpacity>
          </View>

          <Input
            style={styles.inputWrapper}
            label="Tên sản phẩm"
            placeholder="Tên sản phẩm"
            defaultValue={nameRef.current}
            onChangeText={(text) => (nameRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Loại sản phẩm</Text>
            <RNPickerSelect
              onValueChange={setType}
              value={type}
              placeholder={{ label: "Chọn loại sản phẩm", value: null }}
              items={[
                { label: "Bakery", value: "Bakery" },
                { label: "Dish", value: "Dish" },
                { label: "Smoothie", value: "Smoothie" },
              ]}
              style={{
                inputIOS: styles.inputAndroid,
                inputAndroid: styles.inputAndroid,
              }}
            />
          </View>

          <Input
            style={styles.inputWrapper}
            label="Giá sản phẩm"
            placeholder="Giá"
            keyboardType="numeric"
            defaultValue={priceRef.current}
            onChangeText={(text) => (priceRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Input
            style={styles.inputWrapper}
            label="Khuyến mãi"
            placeholder="Khuyến mãi"
            defaultValue={discountRef.current}
            onChangeText={(text) => (discountRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Input
            style={styles.inputWrapper}
            label="Lợi ích sản phẩm"
            placeholder="Lợi ích sản phẩm"
            defaultValue={profitRef.current}
            onChangeText={(text) => (profitRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Input
            style={styles.inputWrapper}
            label="Nguyên liệu"
            placeholder="Nguyên liệu"
            defaultValue={sourceRef.current}
            onChangeText={(text) => (sourceRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />
          <Input
            style={styles.inputWrapper}
            label="Cách chế biến"
            placeholder="Cách chế biến"
            defaultValue={wayRef.current}
            onChangeText={(text) => (wayRef.current = text)}
            onSubmitEditing={Keyboard.dismiss}
          />

          <View style={styles.buttonWrapper}>
            <ButtonMain
              size="large"
              style={styles.button}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Đang gửi..."
                : editing
                ? "Cập nhật"
                : "Thêm sản phẩm"}
            </ButtonMain>
          </View>
        </ScrollView>

        <CusModal
          visible={showSuccessModal}
          title="Chúc mừng bạn!"
          message={
            editing
              ? "Cập nhật sản phẩm thành công!"
              : "Thêm sản phẩm thành công!"
          }
        />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
