'use client';

import React, { useEffect, useState } from 'react'
import classes from './cart.module.css';
import Image from 'next/image';
import { useCartStore } from '@/store';
import NumberPicker from '../NumberPicker/numberPicker';
import { Button, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { RiDeleteBin4Fill } from "react-icons/ri";
import swal from 'sweetalert';


const CartDetails = () => {
    const router = useRouter();
    const [cartData, setCartData] = useState([]);
    const pIds = useCartStore.getState().pId;
    const cartDetails = useCartStore((state) => state.cartData);
    const removeItems = useCartStore((state) => state.removeItem);
    const removeAllItems = useCartStore((state) => state.removeAllItems)

    useEffect(() => {
        setCartData(cartDetails);
    }, [cartDetails])
    const handleContinueShopping = () => {
        router.push('/Products')
    }
    const handleRemoveItems = (id: number) => {
        swal({
            title: "Remove",
            text: "Item will be remove from cart",
            icon: "error",
            buttons: true,
          }).then((value) =>{
            if(value){
                removeItems(id);
            }
          })
    }
    const cancelCart = () =>{
        swal({
            title: "Cancel Order",
            text: "Do you want to cancel this order?",
            icon: "error",
            buttons: ["No", "Yes"],
          }).then((value) =>{
            if(value){
                removeAllItems();
            }
          })
    }
    return (
        <>

            <div className={classes.wrapper}>
                {cartData != "" ? (
                    <div className={classes.cartHeader}>
                        <h2>Your Order Items...</h2>
                        <Button onClick={cancelCart}>Cancel Order</Button>
                    </div>
                ) : ""}
                {cartData != "" ? cartData?.map((dt: any) => (
                    <div className={classes.cartDetails} key={dt.id}>
                        <div className={classes.cartContent} >
                            <Image src={dt.cover_image} alt={'Books Image'} width={100} height={100} className={classes.image} />
                            <p>{dt.title} <br /> {dt.description} </p>
                        </div>
                        <div style={{ borderRight: '1px solid purple', paddingRight: '10px' }}>
                            <p>Rs. {dt.price}</p>
                        </div>
                        <NumberPicker id={dt.id} />
                        <RiDeleteBin4Fill className={classes.trashicon} onClick={() => handleRemoveItems(dt.id)} />
                    </div>
                )) : (
                    <div className={classes.cartEmpty}>
                        <h2>There are no items in the cart</h2>
                        <Button onClick={(e: any) => handleContinueShopping(e)}>
                            <Text tt="uppercase" fw={600}>Continue Shopping</Text>
                        </Button>
                    </div>
                )}
                {/* <Table books={cartData} /> */}
            </div>
        </>
    )
}

export default CartDetails