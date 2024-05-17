'use client';
import { useEffect, useState } from 'react';
import { Group, Code, Badge } from '@mantine/core';
import classes from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { BsCartCheckFill } from "react-icons/bs";

const data = [
  { link: '/Products', label: 'Products', icon: 'IconBellRinging' },
  { link: '/Cart', label: 'My Cart', icon: 'IconReceipt2' },
  { link: '/Orders', label: 'Orders', icon: 'IconReceipt2' },
];

export function Navbar() {
    const router = useRouter();
    const [active, setActive] = useState<String>('Products');
    let cardDetails = useCartStore((state) => state.cartData);

    const handleOnClickLink = (e:any,label:String,link:any) =>{
        e.preventDefault();
        setActive(label);
        router.push(link);
    }

    const handleCartLink = () =>{
      router.push('/Cart');
    }

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(e) => handleOnClickLink(e,item.label, item.link)}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <h1>Book Store</h1>
          <span style={{fontSize:'30px', alignItems:'center', cursor:'pointer'}}>
            <BsCartCheckFill onClick={handleCartLink}/>
            <Badge size="xs" circle>{cardDetails.length}</Badge></span>
        </Group>
        {links}
      </div>

    
    </nav>
  );
}