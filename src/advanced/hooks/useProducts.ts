import { useAtomValue, useSetAtom } from 'jotai';
import { productsAtom, addProductAtom, updateProductAtom, deleteProductAtom } from '../atoms/productAtoms';
import { Product } from '../../types';

export const useProducts = () => {
  const products = useAtomValue(productsAtom);
  const addProduct = useSetAtom(addProductAtom);
  const updateProduct = useSetAtom(updateProductAtom);
  const deleteProduct = useSetAtom(deleteProductAtom);

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
