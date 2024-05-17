
import { Card, Image, Text, Group, Button } from '@mantine/core';
import classes from './card.module.css';
import { useRouter } from 'next/navigation';
import { BsCartPlusFill } from "react-icons/bs";
import { useCartStore } from '@/store';
import { notifications } from '@mantine/notifications';
import books from '../../../component.json';


type CardParams = {
    key:String | number,
    id: String,
    imgUrl: String,
    title: string,
    author: String,
    description: String | undefined | null ,
    price: number
}

export const FeaturesCard: React.FC<CardParams> = ({ id, imgUrl, title, author, description, price }) => {
    let productIds: any = [];
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);
    const cartState = useCartStore((state) => state.cartData);
    // const features = badges.map((badge) => (
    //     <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
    //         {badge.label}
    //     </Badge>
    // ));

    const handleOnClick = (e:any, id:number) => {
        e.preventDefault();
        router.push(`/ProductView/${id}`)
    }

    const handleAddToCart = (e: any, id: number,qty:number) => {
        const data = books.filter((val:any) => {
            if(val.id === id){
               val.qty = qty;
               return val;
            }
        })
        addToCart(id,data);
    }

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={imgUrl} alt={title} width={100} height={250} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Text fw={500} className={classes.text}>
                    {title}
                </Text>
                <Text fz="sm">
                    {author}
                </Text>
                <Text fz="md" style={{ color: 'green' }}>
                    Rs. {price}
                </Text>
            </Card.Section>

            {/* <Card.Section className={classes.section}>
                <Text mt="md" className={classes.label} c="dimmed">
                    Perfect for you, if you enjoy
                </Text>
                <Group gap={7} mt={5}>
                    {features}
                </Group>
            </Card.Section> */}

            <Group className={classes.cardGroup}>
                <Button radius="md" style={{ flex: 1 }} onClick={(e: any) => handleOnClick(e, parseInt(id))}>
                    View
                </Button>
                {/* <span style={{ flex: 1, fontSize: '30px', color: 'gray', cursor: 'pointer' }} onClick={(e: any) => handleAddToCart(e, parseInt(id),1)}>
                    <BsCartPlusFill />
                </span> */}
                <Button style={{  cursor: 'pointer' }} onClick={(e: any) => handleAddToCart(e, parseInt(id),1)}>
                   Add to cart
                </Button>
            </Group>
        </Card>
    );
}