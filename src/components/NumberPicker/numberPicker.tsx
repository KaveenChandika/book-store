'use client';

import { useCartStore } from '@/store';
import React, { useEffect, useState } from 'react';
import { FaMinusSquare, FaPlusSquare} from 'react-icons/fa';


const NumberPicker = ({id}) => {

    const [item,setItems] = useState([])
    const increment = useCartStore((state) => state.increment);
    const decrement = useCartStore((state) => state.decrement);
    const cartDetails = useCartStore((state) => state.cartData)

    useEffect(() =>{
        const cartItem = cartDetails.filter((dt:any) => dt.id === id);
        setItems(cartItem[0]);
    },[id])
    return (
        <>
            <p>Qty </p>
            <span style={{ fontSize: '40px', width: '50px', height: '50px', color: 'lightblue' }} onClick={() => decrement(id)}><FaMinusSquare /></span>
            <input type={'text'} readOnly value={item.qty} onChange={(e) => handleQuantity(e.target.value)} style={{width:'35px', textAlign:'center', }} />
            <span style={{ fontSize: '40px', width: '50px', height: '50px', color: 'lightblue', marginLeft: '10px' }} onClick={() => increment(id,1)}><FaPlusSquare /></span>
        </>
    )
}

export default NumberPicker