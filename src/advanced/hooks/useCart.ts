import { useAtomValue, useSetAtom } from 'jotai';
import { cartAtom, addToCartAtom, removeFromCartAtom, updateQuantityAtom, getRemainingStockAtom, calculateCartItemTotalAtom } from '../atoms/cartAtoms';
import { Product, CartItem } from '../../types';

export const useCart = () => {
  const cart = useAtomValue(cartAtom);
  const addToCart = useSetAtom(addToCartAtom);
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const updateQuantity = useSetAtom(updateQuantityAtom);
  const getRemainingStock = useAtomValue(getRemainingStockAtom);
  const calculateItemTotal = useAtomValue(calculateCartItemTotalAtom);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getRemainingStock,
    calculateItemTotal,
  };
};
