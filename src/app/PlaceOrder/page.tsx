'use client'

import CartDetails from '@/components/Cart/cartDetails'
import { Form } from '@/components/Form/form'
import { useCartStore } from '@/store'
import React from 'react'
import classes from './page.module.css';

const PlaceOrder = () => {
  let cartDetails = useCartStore((state) => state.cartData);
  return (
    <div className={classes.placeOrderDetails}>
      <div>
        <CartDetails />
      </div>
      <div>
        {cartDetails.length > 0 ? (
          <Form />
        ) : ""}
      </div>
    </div>
  )
}

export default PlaceOrder