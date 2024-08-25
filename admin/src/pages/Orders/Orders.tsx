import React from 'react'
import './Orders.css'

interface OrdersProps{
  url : string
}

const Orders:React.FC<OrdersProps> = ({url}) => {
  return (
    <div>Orders</div>
  )
}

export default Orders