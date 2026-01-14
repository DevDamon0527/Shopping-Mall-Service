import { log } from 'node:console';
import { useState } from 'react';

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

function App() {
  const products: ProductType[] = [];
  console.log(products);
  return <h1>쇼핑몰 앱 만들어보기</h1>;
}

export default App;
