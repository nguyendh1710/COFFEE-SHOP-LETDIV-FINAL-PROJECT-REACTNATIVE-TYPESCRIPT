import React from "react";
import { Text, View, Image, SectionList, TouchableOpacity, FlatList } from "react-native";
import { useTheme } from "./../../context/ThemeContext";
import { customStyles } from "./Home.style";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import Input from "./../../components/Input/Input";
import ProductItem from "./ProductItem/ProductItem";

type Product = {
  id: number;
  name: string;
  price: number;
  discount: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Cà phê sữa",
    price: 25000,
    discount: "30%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product1.png?raw=true",
  },
  {
    id: 2,
    name: "Trà đào",
    price: 30000,
    discount: "70%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-3.png?raw=true",
  },
  {
    id: 3,
    name: "Matcha đá xay",
    price: 40000,
    discount: "80%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-4.png?raw=true",
  },
  {
    id: 4,
    name: "Smoothie dâu tây việt quốc",
    price: 35000,
    discount: "60%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-5.png?raw=true",
  },
  {
    id: 5,
    name: "Cà phê Expresso",
    price: 40000,
    discount: "20%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-6.png?raw=true",
  },
  {
    id: 6,
    name: "Bánh mì que Pate",
    price: 30000,
    discount: "32%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-7.png?raw=true",
  },
  {
    id: 7,
    name: "Bánh Tiramisu",
    price: 35000,
    discount: "40%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-8.png?raw=true",
  },
  {
    id: 8,
    name: "Bông lan cuộn trà xanh",
    price: 40000,
    discount: "36%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product-9.png?raw=true",
  },
  {
    id: 9,
    name: "Matcha đá xay",
    price: 40000,
    discount: "30%",
    image:
      "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Home/ProductItem/product1.png?raw=true",
  },
];

export default function Home() {
  const { theme } = useTheme(); // Lấy theme hiện tại từ PaperProvider
  const styles = customStyles(theme); // Truyền theme vào customStyles

  // Hàm render từng sản phẩm trong danh sách
  const renderItem = ({ item }: { item: Product }) => (
    <ProductItem item={item} style={styles.item} />
  );

  // Dữ liệu sections cho SectionList
  const sections = [
    {
      title: "Món mới - Ngại gì không thử!",
      data: products, // Danh sách sản phẩm cho section này
    },
    {
      title: "Cho một ngày thật chill",
      data: products, // Danh sách sản phẩm cho section này
    },
    {
      title: "Khám phá ngay thôi nào!",
      data: products, // Danh sách sản phẩm cho section này
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://github.com/nguyendh-xp97/VerDHN-Mobile-App-Coffee-Shop-LetDiv-ReactNative/blob/main/src/screen/Auth/Signin/logo-lulo-coffee%201.png?raw=true",
          }}
          alt="logo"
        />
         
      
      </View>
       {/* Search */}
      <Input
              placeholder="Tìm món... "
              hasIcon={true}
              iconPosition={"end"}
              iconName={["search", "filter"]}
            />
      {/* Nội dung chính */}
      <SectionList
        sections={sections} // Dữ liệu các section
        keyExtractor={(item, index) => index.toString()}
        // ListHeaderComponent={
         
          
        // }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
       
          <View style={styles.sectionHeader}>
               <View style={styles.searchContainer}>
            <Text style={styles.title}>{section.title}</Text>
            </View>
          </View>
        
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 DHN Coffee</Text>
        {/* <TouchableOpacity onPress={() => alert("Liên hệ với chúng tôi!")}>
          <Text style={styles.footerLink}>Liên hệ</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
