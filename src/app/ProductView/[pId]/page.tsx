import { CardDetails } from '@/components/CardDetails/cardDetails';
import React from 'react'

type ProductViewProps = {
  params:any
}

const ProductView:React.FC<ProductViewProps> = ({params}) => {
  let {pId} = params;
  return (
    <div>
      <h2>Product Deatails View...</h2>
      <CardDetails id={pId} />
    </div>
  )
}

export default ProductView