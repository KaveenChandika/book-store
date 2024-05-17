'use client';

import React from 'react'
import classes from './page.module.css';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
    const router = useRouter();
    const handleContinueShopping = () =>{
      window.location.reload("/Products")
    }   
  return (
    <div className={classes.success}>
        <h1>Thank You</h1>
        <h2>Your order has been placed Successfully!</h2>
        <Button onClick={(e:any) => handleContinueShopping(e)}>
            <Text tt="uppercase" fw={600}>More Shopping</Text>
        </Button>
    </div>
  )
}

export default SuccessPage