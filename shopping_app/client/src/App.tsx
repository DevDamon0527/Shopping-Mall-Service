import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, ProductPage } from './pages';

function App() {
  return (
    <Routes>
      {/* path='/' 대신에 index 가능 */}
      <Route path="/" element={<HomePage />} />
      <Route path="/:productId" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
