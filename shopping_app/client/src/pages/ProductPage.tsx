import { log } from 'node:console';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  });
  return <h1>상품 상세 페이지</h1>;
}

export default ProductPage;
