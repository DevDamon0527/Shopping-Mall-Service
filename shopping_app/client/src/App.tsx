import { useRef, useState } from 'react';

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: number) => void;
  onUpdate: (product: ProductType) => void;
}

//  #4. 상품 수정하기
function ProductItem({ product, onDelete, onUpdate }: ProductItemProps) {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false); // 토글 버튼
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanantion] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>
      {/* #3. 삭제하기 */}
      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>
      {/* #4. 삭제하기 */}
      <button type="button" onClick={() => setIsEditMode((prev) => !prev)}>
        수정하기
      </button>
      {isEditMode && (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onUpdate({
              id,
              name: editName,
              price: editPrice,
              explanation: editExplanation,
            });
          }}
        >
          <input
            type="text"
            placeholder="상품 이름"
            value={editName}
            onChange={(event) => setEditName(event.target.value)}
          />
          <input
            type="text"
            placeholder="상품 설명"
            value={editExplanation}
            onChange={(event) => setEditExplanantion(event.target.value)}
          />
          <input
            type="number"
            placeholder="상품 가격"
            value={editPrice}
            onChange={(event) => setEditPrice(parseInt(event.target.value, 10))}
          />
          <input type="submit" value="상품 수정하기" />
        </form>
      )}
    </div>
  );
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

  // #2. 상품 추가시 (ID 값 만들기)
  const fakeId = useRef(0); // 값 저장. 리렌더링 (x)
  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([
      ...products,
      {
        ...newProduct,
        id: fakeId.current,
      },
    ]);
  };

  // #5. 상품 삭제 이벤트 핸들러
  const handleDelete = (id: number) => setProducts(products.filter((product) => product.id !== id));

  // #6. 수정하기 업데이트 이벤트 핸들러 (업데이트 로직)
  const handleUpdate = (updateProduct: {
    id: number;
    name: string;
    explanation: string;
    price: number;
  }) => {
    setProducts(
      products.map((product) => (product.id === updateProduct.id ? updateProduct : product)),
    );
  };

  return (
    <>
      {/* #1. 상품 추가하기. */}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreate({
            name,
            explanation,
            price,
          });
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
      {/* products 상태를 화면에 표시. (map 메서드 배열 렌더링) */}
      {/* 각 상품 요소를 리액트 엘리먼트로 변환시켜 새로운 배열을 만드는 것. */}
      {/* 고유한 키 값 (key value) 전달 */}

      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </>
  );
}

export default App;
