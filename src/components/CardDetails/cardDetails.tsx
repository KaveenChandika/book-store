'use client';

import { Text, Title, TextInput, Button, Image, Badge } from '@mantine/core';
import image from './image.svg';
import classes from './cardDetails.module.css';
import books from '../../../component.json';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/store';
import Input from '../Input/Input';
import NumberPicker from '../NumberPicker/numberPicker';
import { useRouter } from 'next/navigation';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

type cardDeatilsParams = {
    id: number
}

export const CardDetails: React.FC<cardDeatilsParams> = ({ id }) => {
    const router = useRouter();
    const [bookDetails, setBookDetails] = useState<any>([]);
    const addToCart = useCartStore((state) => state.addToCart);
    const cartState = useCartStore((state) => state.cartData);
    const handleAddToCart = (e: any, id: number,qty:number) => {
        alertify.success('ITEM ADDED TO CART'); 
        const data = books.filter((val:any) => {
            if(val.id === id){
               val.qty = qty;
               return val;
            }
        })

        addToCart(id,data);
        console.log("CART STATE" , cartState);
    }

    const handleBack = () =>{
        router.push("/Products");
    }

    useEffect(() => {
        const data: any = books.filter((val) => val.id == id)
        setBookDetails(data[0]);
    }, [id])

    return (
        <div className={classes.wrapper}>
            <Image src={bookDetails.cover_image} className={classes.image} />
            <div className={classes.body}>
                <Title className={classes.title}>{bookDetails.title}</Title>
                <Text fw={500} fz="lg" mb={5}>{bookDetails.author}</Text>
                <Text fz="sm" c="dimmed">{bookDetails.description}</Text>

                <Text className={classes.publish}>
                    <p>First Publish :</p>
                    <span>
                        {bookDetails.publication_year}
                    </span>
                </Text>
                <Text className={classes.publish}>
                    <p>Author :</p>
                    <span>
                        {bookDetails.author}
                    </span>
                </Text>
                <Text className={classes.genre}>
                    <p>Genre :</p>
                    <span style={{ display: 'flex', gap: '2px' }}>
                        {bookDetails.genre?.map((val: any) => (
                            <Badge color="green">{val}</Badge>
                        ))}
                    </span>
                </Text>
                <Text className={classes.genre}>
                    <p>Price :</p>
                    <span>{bookDetails.price}</span>
                </Text>
                <div className={classes.controls}>
                    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                        <NumberPicker id={id} />
                    </div> */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Button className={classes.control} onClick={() => handleBack()} >Back</Button>
                        <Button className={classes.control} onClick={(e) => handleAddToCart(e, parseInt(id),1)}>Add To Cart</Button>
                    </div>

                </div>
            </div>
        </div>
    );
}