import React from "react";
import { Text, TouchableOpacity, View, Image} from "react-native";
import { useTheme } from "./../../../context/ThemeContext";
import { customStyles } from "./ProductItem.style";
import Rating from "../../../components/Rating/Rating";
import Ionicons from 'react-native-vector-icons/Ionicons';


type Product = {
  id: number;
  name: string;
  price: number;
  discount: string;
  image: string;
};

type ProductItemProps = {
  item: Product; 
  style?: any;
};

export default function ProductItem({item}:ProductItemProps) {
  const { theme } = useTheme(); // Lấy theme hiện tại từ PaperProvider

  const styles = customStyles(theme); // Truyền theme vào customStyles
  return (
    <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: item.image ,
        }}
        style={styles.mainImage}
      />
      <View style={styles.discountContainer}>
        <View style={styles.discountTextContainer}>
          <Text style={styles.discountText}>- {item.discount}</Text>
        </View>
      </View>
    </View>

    <View style={styles.productInfoContainer}>
      <View style={styles.nameContainer}>
        <Text numberOfLines={1} style={styles.productName}>
        {item.name}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}> {item.price}đ</Text>
      </View>
    </View>
  
    <View style={styles.ratingContainer}>
      <Rating />
      </View>
    <View style={styles.iconContainer}>
      {/* Sử dụng icon giỏ hàng */}
      <Ionicons name="eye" size={30} style={styles.iconEye} />
      <Ionicons name="cart" size={30}  style={styles.iconCart}/>
    </View>

   
  </View>
  );
}




