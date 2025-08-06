import { useState, useCallback } from 'react';
import { Coupon, initialCoupons } from '../../types';
import { useLocalStorage } from './useLocalStorage';

export const useCoupons = () => {
  const [coupons, setCoupons] = useLocalStorage<Coupon[]>(
    'coupons',
    initialCoupons
  );
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons(prev => [...prev, newCoupon]);
  }, []);

  const deleteCoupon = useCallback(
    (couponCode: string) => {
      setCoupons(prev => prev.filter(c => c.code !== couponCode));
      if (selectedCoupon?.code === couponCode) {
        setSelectedCoupon(null);
      }
    },
    [selectedCoupon]
  );

  return {
    coupons,
    selectedCoupon,
    setSelectedCoupon,
    addCoupon,
    deleteCoupon,
  };
};