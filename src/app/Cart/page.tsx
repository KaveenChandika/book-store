'use client';

import CartDetails from '@/components/Cart/cartDetails'
import Checkout from '@/components/Checkout/checkout'
import React from 'react'
import classes from './page.module.css';
import { useCartStore } from '@/store';

const Cart = () => {
  let cartDetails = useCartStore((state) => state.cartData);
  return (
    <div className={classes.cartDetails}>
      <div style={{width:'200%'}}>
        <CartDetails />
      </div>
      {cartDetails.length > 0 ? (
        <div>
          <Checkout cartDeatails={[]} />
        </div>
      ) : ""}
    </div>
  )
}

export default Cart