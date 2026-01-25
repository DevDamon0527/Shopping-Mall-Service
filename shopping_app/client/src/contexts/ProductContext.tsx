import { createContext, useContext } from 'react';

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}
// Context 정의
const ProductContext = createContext<ProductType[]>([]);

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
  return <ProductContext.Provider value={initialValue}>{children}</ProductContext.Provider>;
}

// Consumer 정의
export function useProductContext(): ProductType[] {
  return useContext(ProductContext);
}
