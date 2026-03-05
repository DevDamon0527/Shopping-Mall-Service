import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductType {
  id: string;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  onDelete: (id: string) => void;
  onUpdate: (product: ProductType) => void;
}

function ProductItem({ product, onDelete, onUpdate }: ProductItemProps) {
  const { id, name, price, explanation } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editExplanation, setEditExplanantion] = useState(explanation);
  const [editPrice, setEditPrice] = useState(price);

  return (
    <div>
      <div>{id}</div>
      <div>
        <Link to={`/${id}`}>{name}</Link>
      </div>
      <div>{price}</div>
      <div>{explanation}</div>

      <button type="button" onClick={() => onDelete(id)}>
        삭제하기
      </button>

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
            setIsEditMode(false);
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
            onChange={(event) => setEditPrice(Number(event.target.value))}
          />
          <input type="submit" value="상품 수정하기" />
        </form>
      )}
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch('/product')
      .then((response) => response.json())
      .then((data) => setProducts(data.products as ProductType[]));
  }, []);

  const fakeId = useRef(0);

  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    const created: ProductType = { ...newProduct, id: String(fakeId.current) };

    setProducts((prev) => [created, ...prev]);
  };

  const handleDelete = (id: string) => {
    fetch(`/product/${id}`, { method: 'DELETE' }).then((response) => {
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
      }
    });
  };

  const handleUpdate = (updated: ProductType) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleCreate({ name, explanation, price });
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
          onChange={(event) => setPrice(Number(event.target.value))}
          type="number"
          placeholder="상품 가격"
        />
        <input type="submit" value="상품 만들기" />
      </form>

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

export default HomePage;
