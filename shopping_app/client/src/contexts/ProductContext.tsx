import { createContext, useContext, useState } from 'react';

interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
}

type ProductContextType = [ProductType[], React.Dispatch<React.SetStateAction<ProductType[]>>];

// Context 정의
const ProductContext = createContext<ProductContextType | null>(null);

const initialValue: ProductType[] = [
  {
    id: 0,
    name: 'Iphone 13 Max',
    explanation: '디스플레이는 어쩌고 저쩌고 설명',
    price: 1230000,
  },
];

// Provider 정의
export function ProductProvider({ children }: { children: React.ReactNode }) {
  const productState = useState<ProductType[]>(initialValue);
  return <ProductContext.Provider value={productState}>{children}</ProductContext.Provider>;
}

// Consumer 정의
export function useProductContext() {
  return useContext(ProductContext) as ProductContextType;
}
