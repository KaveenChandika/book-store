'use client';

import { NumberInput, TextInput, Button, Text } from '@mantine/core';
import classes from './form.module.css';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from '@/store';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert';

type FormData = {
    name: String,
    email: String,
    mobile: number,
    address: String,
    zipcode: number,
    city: String
}

export const Form = () => {
    const cartItems = useCartStore((state) => state.cartData);
    const router = useRouter();

    const ShippingDetailsSchema = z.object({
        name: z.string().min(2).max(30),
        email: z.string().email(),
        mobile: z.number().min(10),
        address: z.string().min(1),
        zipcode: z.number(),
        city: z.string().min(1)
    })

    const { register, handleSubmit, formState:{errors} } = useForm({ resolver: zodResolver(ShippingDetailsSchema) })

    const submitData = (data: FormData) => {
        let arrData = [];
        let arrUser = []
        console.log("IT WORKEd", data)
        console.log("CART ITEMS", cartItems)
        arrUser.push(data);
        let objData = {
            user:arrUser,
            order:cartItems
        }
        arrData.push(objData);
        let orderData = JSON.stringify(arrData);
        localStorage.setItem("order", orderData);
        useCartStore.setState({cartData : []})
        swal({
            title: "Your order has placed successfully!",
            text: "",
            icon: "success",
            button: "OK",
          }).then((value) =>{
            if(value){
                router.push("/Success")
            }
          })
    }

    return (
        <div className={classes.wrapper}>
            <Text tt="uppercase" fz="xl" fw="bold" className={classes.formTitle}>Shipping Details</Text>
            <form onSubmit={handleSubmit(submitData)}>
                <TextInput label="Name" placeholder="Name" {...register('name')} />
                {errors.name && <span >{errors.name.message}</span>}

                <TextInput mt="sm" label="Email" placeholder="Email" {...register('email')}/>
                {errors.email && <span >{errors.email.message}</span>}

                <TextInput mt="sm" label="Mobile" placeholder="Mobile" {...register('mobile', {valueAsNumber: true})}/>
                {errors.mobile && <span >{errors.mobile.message}</span>}

                <TextInput mt="sm" label="Address" placeholder="Address" {...register('address')} />
                {errors.address && <span >{errors.address.message}</span>}

                <TextInput mt="sm" label="Zip Code" placeholder="Zip/Postal Code" {...register('zipcode', {valueAsNumber: true})}/>
                {errors.zipcode && <span >{errors.zipcode.message}</span>}

                <TextInput mt="sm" label="City" placeholder="City" {...register('city')} />
                {errors.city && <span >{errors.city.message}</span>}

                <Button type="submit" mt="sm" fullWidth>
                    <Text tt="uppercase" fw={600}>Deliver Here</Text>
                </Button>
            </form>
        </div>
    );
}