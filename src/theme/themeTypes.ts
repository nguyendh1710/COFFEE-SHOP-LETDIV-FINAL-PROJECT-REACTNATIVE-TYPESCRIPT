export type TypeOfTheme = {
  colors: {
    background: string;
    textBlack?: string;
    textWhite?: string;
    text?: string;
    primary: string;
    enableButton: string;
    unableButton: string;
  };
  typography: {
    heading1: TypographyType;
    title: TypographyType;
    subTitle: TypographyType;
    textMedium: TypographyType;
    textSmall: TypographyType;
  };
  radius: {
    radiusM: number,
    radiusXl: number;
  };
};

type TypographyType = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  fontStyle: 'normal' | 'italic'; // Sửa từ string -> enum hợp lệ
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
};
