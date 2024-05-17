'use client';

import { Table } from '@/components/Table/dataTable'
import React from 'react'
import books from '../../../component.json'
import { OrderTable } from '@/components/Table/orderTable'
import classes from './page.module.css';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

const Orders = () => {
  const router = useRouter();
  const data = JSON.parse(localStorage.getItem("order"));
  const handleContinueShopping = () => {
    window.location.href="/Products"
  }
  return (
    <div className={classes.order}>
      {data && data[0].order.length > 0 ? (
        <>
          <div>
            <h2> My Orders</h2>
          </div>
          <OrderTable />
        </>
      ) : (
        <div className={classes.orderEmpty}>
          <h2>No Orders</h2>
          <Button onClick={(e: any) => handleContinueShopping(e)}>
            <Text tt="uppercase" fw={600}>Continue Shopping</Text>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Orders