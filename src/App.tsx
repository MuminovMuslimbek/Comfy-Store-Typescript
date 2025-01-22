import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductsDetails from './pages/ProductsDetails';
import ErrorPage from './pages/ErrorPage';

interface CountCartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const CountCart = createContext<CountCartContextType | null>(null);

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <CountCart.Provider value={{ count, setCount }}>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/about" element={<MainLayout><About /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/products" element={<MainLayout><Products /></MainLayout>} />
          <Route path="/products/:id" element={<MainLayout><ProductsDetails /></MainLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </CountCart.Provider>
    </div>
  );
};

export default App;