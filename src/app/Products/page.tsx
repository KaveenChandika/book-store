'use client';

import { FeaturesCard } from '@/components/Card/card';
import Input from '@/components/Input/Input';
import { Table } from '@/components/Table/dataTable';
import React, { useEffect, useState } from 'react'
import books from '../../../component.json';
import { Grid, Select } from '@mantine/core';
import classes from "./page.module.css";

const Products = () => {
    const [title,setTitle] = useState<String>('');
    const [author,setAuthor] = useState<String>('');
    const [bookData,setBookData] = useState(books);
    const [categories,setCategories] = useState<any[]>();
    const [searchValue,setSearchValue] = useState<any>('');

    const handleFilterCriterias = () =>{
        if(title != ''){
            let data = books.filter((val) => val.title.toLowerCase().includes(title.toLowerCase()))
            setBookData(data);
        }else if(author != ''){
            let data = books.filter((val) => val.author.toLowerCase().includes(author.toLowerCase()))
            setBookData(data);
        }else if(searchValue != '' && searchValue != null){
            let data = books.filter((val) => val.genre.includes(searchValue))
            setBookData(data);
        }else{
            setBookData(books);
        }
    }

    useEffect(() =>{
        handleFilterCriterias();
    },[title,author,searchValue])

    
    const handleBooksCategories = () =>{
        const genre = books.map((val) => val.genre);
        const flattedArr = genre.flat();
        const uniqueGenre = [...new Set(flattedArr)];
        setCategories(uniqueGenre)
    }
    
    useEffect(() =>{
        handleBooksCategories()
    },[])
    return (
        <div className={classes.products}>
            <div>
                <h2> Search Your Favourite Book</h2>
            </div>
            <div className={classes.searchCriteria}>
                <div className={classes.inputFileds}>
                    <Input type="text" placeholder={'Title'} value={title} onChange={(e:any) => setTitle(e.target.value)} />
                    <Input type="text" placeholder={'Author'} value={author} onChange={(e:any) => setAuthor(e.target.value)} />
                </div>
                <div>
                    <Select
                        placeholder="Select Category"
                        data={categories}
                        value={searchValue} 
                        onChange={setSearchValue}
                    />
                </div>
            </div>
            <div className={classes.booksGrid}>
                {bookData && bookData.map((dt:any) => (
                    <FeaturesCard key={dt.id} title={dt.title} author={dt.author} price={dt.price} imgUrl={dt.cover_image} id={dt.id} description={dt.description}/>
                ))}
            </div>
        </div>
    )
}

export default Products