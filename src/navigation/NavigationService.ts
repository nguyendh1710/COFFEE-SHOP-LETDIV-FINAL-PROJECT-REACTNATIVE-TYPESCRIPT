// file này dùng định hướng navigation mọi nơi
import { createNavigationContainerRef } from '@react-navigation/native';

// Định nghĩa kiểu cho sản phẩm
export type Product = {
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
type PaymentInfo = {
  methodName?: string;
  bankName: string | null;
  shippingName?: string;
  promoCode?: string;
  note: string;
};
// 
export type RootStackParamList = {
  Intro: undefined;
  Main: undefined;
  ProductDetail: { productSelectDetail: Product };
  SignIn: { redirectTo?: keyof RootStackParamList } | undefined;
  Cart: { fromPayment?: boolean };
  Payment: {
    total: number;
    items: any[];
  };
  PaymentSuccess: { infoPayment: PaymentInfo };
  ProductItem: undefined;
  SignUp: { redirectTo?: keyof RootStackParamList };
  AdminProductList: undefined;
  Voucher: undefined;
  ProductForm: { mode: 'create' } | { mode: 'edit', product: Product };
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();
