import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CartItem, Product, ProductWithUI } from '../../types';
import { productsAtom } from './productAtoms';
import { addNotificationAtom } from './notificationAtoms';
import { calculateItemTotal } from '../utils/calculators';

export const cartAtom = atomWithStorage<CartItem[]>('cart', []);

export const getRemainingStockAtom = atom((get) => (product: Product) => {
  const cart = get(cartAtom);
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
});

export const addToCartAtom = atom(
  null,
  (get, set, product: ProductWithUI) => {
    const addNotification = get(addNotificationAtom);
    const getRemainingStock = get(getRemainingStockAtom);
    const remainingStock = getRemainingStock(product);

    if (remainingStock <= 0) {
      set(addNotificationAtom, '재고가 부족합니다!', 'error');
      return;
    }

    set(cartAtom, (prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;

        if (newQuantity > product.stock) {
          set(addNotificationAtom,
            `재고는 ${product.stock}개까지만 있습니다.`,
            'error'
          );
          return prevCart;
        }

        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      return [...prevCart, { product, quantity: 1 }];
    });

    set(addNotificationAtom, '장바구니에 담았습니다', 'success');
  }
);

export const removeFromCartAtom = atom(
  null,
  (get, set, productId: string) => {
    set(cartAtom, (prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  }
);

export const updateQuantityAtom = atom(
  null,
  (get, set, productId: string, newQuantity: number) => {
    const addNotification = get(addNotificationAtom);
    const products = get(productsAtom);
    const cart = get(cartAtom);

    if (newQuantity <= 0) {
      set(cartAtom, (prevCart) =>
        prevCart.filter((item) => item.product.id !== productId)
      );
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const maxStock = product.stock;
    if (newQuantity > maxStock) {
      set(addNotificationAtom, `재고는 ${maxStock}개까지만 있습니다.`, 'error');
      return;
    }

    set(cartAtom, (prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }
);

export const calculateCartItemTotalAtom = atom((get) => (item: CartItem) => {
  const cart = get(cartAtom);
  return calculateItemTotal(item, cart);
});

export const clearCartAtom = atom(
  null,
  (get, set) => {
    set(cartAtom, []);
  }
);