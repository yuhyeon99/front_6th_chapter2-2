
export const formatPrice = (
  price: number,
  isAdmin: boolean = false,
  productId?: string,
  remainingStock?: number
): string => {
  if (productId && remainingStock !== undefined && remainingStock <= 0) {
    return 'SOLD OUT';
  }

  if (isAdmin) {
    return `${price.toLocaleString()}원`;
  }
  return `₩${price.toLocaleString()}`;
};
