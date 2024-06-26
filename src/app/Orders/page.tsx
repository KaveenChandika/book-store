'use client';

import { Table } from '@/components/Table/dataTable'
import React, { useEffect, useState } from 'react'
import books from '../../../component.json'
import { OrderTable } from '@/components/Table/orderTable'
import classes from './page.module.css';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';

const Orders = () => {
  const router = useRouter();
  const [data,setData] = useState([]);
 
  const handleContinueShopping = () => {
    window.location.href="/Products"
  }

  useEffect(() =>{
    const orders = localStorage.getItem("order");
    const data = orders ? JSON.parse(orders) : []
    setData(data);
  },[])
  return (
    <div className={classes.order}>
      {data && data[0]?.order.length > 0 ? (
        <>
          <div>
            <h2> My Orders</h2>
          </div>
          <OrderTable />
        </>
      ) : (
        <div className={classes.orderEmpty}>
          <h2>No Orders</h2>
          <Button onClick={handleContinueShopping}>
            <Text tt="uppercase" fw={600}>Continue Shopping</Text>
          </Button>
        </div>
      )}
    </div>
  )
}

export default Orders