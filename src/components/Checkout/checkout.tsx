import React, { useEffect, useState } from 'react'
import classes from './checkout.module.css';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';

type CheckoutProps = {
  cartDeatails: []
}

const Checkout: React.FC<CheckoutProps> = ({ cartDeatails }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useCartStore((state) => state.cartData);
  const router = useRouter();

  useEffect(() =>{
    let data = cartItems.reduce((acc,item) => {
        return acc += item.price * item.qty 
    },0)
    // console.log(data);
    setTotalAmount(data)
  },[cartItems])

  const handleCheckout = () => {
    router.push('/PlaceOrder');
  }
  return (
    <div>
      <div className={classes.wrapper}>
        <div className={classes.summary}>
          <Text tt="uppercase" fz="xl" fw="bold" className={classes.summaryTitle}>Order Summary</Text>
          <div className={classes.summaryContent}>
              <p>Subtotal</p>
              <p>Rs {totalAmount}</p>
          </div>
          <div className={classes.summaryContent}>
              <p>Shipping Fee</p>
              <p>Rs. 0</p>
          </div>
          <div className={classes.summaryContent}>
              <p>Total</p>
              <p>Rs. {totalAmount}</p>
          </div>
          <Button fullWidth onClick={() => handleCheckout()} className={classes.checkoutButton}>
            <div>
              <Text tt="uppercase" fw={600}>Checkout</Text>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Checkout