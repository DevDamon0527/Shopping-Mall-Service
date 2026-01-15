import { useState } from 'react';

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

function App() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: 'Iphone 13 MAX',
      explanation: '디스플레이 ~',
      price: 1230000,
    },
  ]);
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);
  let fakeId = 0;
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fakeId += 1;
          setProducts([...products, { id: fakeId, name, explanation, price }]);
        }}
      >
        <input
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="상품 이름"
        />
        <input
          onChange={(event) => setExplanation(event.target.value)}
          type="text"
          placeholder="상품 설명"
        />
        <input
          onChange={(event) => setPrice(parseInt(event.target.value, 10))}
          type="number"
          placeholder="상품 가격"
        />
        <input type="submit" value="상품 만들기" />
      </form>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.id}</div>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.explanation}</div>
        </div>
      ))}
    </>
  );
}

export default App;
