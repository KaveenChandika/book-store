
import React from 'react'
import { TextInput } from '@mantine/core';
const classes = './Input.module.css';

type InputProps = {
    type:any,
    placeholder:any,
    value:any,
    onChange:any
}

const Input: React.FC<InputProps>= ({type,placeholder,value,onChange}) => {

    return (
        <TextInput
            className={classes}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            mt="lg"
        />
    )
}

export default Input