import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

const normalizeDiameters = (diameters) =>
  Array.isArray(diameters)
    ? diameters.map((d) => String(d)).join("|")
    : String(diameters || "");

const itemsMatch = (a, b) =>
  a.id === b.id &&
  a.selectedPackSize === b.selectedPackSize &&
  a.selectedFlavour === b.selectedFlavour &&
  (a.selectedFilling || "") === (b.selectedFilling || "") &&
  normalizeDiameters(a.selectedDiameters) === normalizeDiameters(b.selectedDiameters);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartData = Cookies.get('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  useEffect(() => {
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
  }, [cart]);

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => itemsMatch(cartItem, item));

      if (existing) {
        return prev.map((cartItem) =>
          itemsMatch(cartItem, item)
            ? { ...cartItem, quantity: Number(cartItem.quantity || 0) + Number(item.quantity || 1) }
            : cartItem
        );
      }

      return [
        ...prev,
        {
          cartId: Date.now() + Math.random(),
          ...item,
        },
      ];
    });
  };

  const updateItem = (cartId, field, value) => {
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, [field]: value } : item))
    );
  };

  const removeItem = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, updateItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};