
import React, { useState } from 'react'
import { Box,Typography,Card,CardContent,CardMedia,Grid, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const OrdersDetail = () => {
  
  const location = useLocation()
  const order = location.state || {}

if (!order.ordersItems) {
  return <Typography>No order details found</Typography>;
}

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
   
      <Grid container spacing={2}>
  {order.ordersItems.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={item._id || item.prodId?._id}>
        <Card sx={{ height: '100%' }}>
          <CardMedia
            sx={{ height: 200 }}
            component="img"
            src={`http://localhost:5000/uploads/${item.prodId?.prodImage}`}
            alt={item.prodId?.productName || "Product"}
          />

          {/* <CardMedia
            sx={{ height: 200 }}
            component="img"
            src={`https://e-commerce-ewhg.onrender.com/uploads/${item.prodId?.prodImage}`}
            alt={item.prodId?.productName || "Product"}
          /> */}

          


          <CardContent>
            <Typography variant="h6">
              {item.prodId?.productName}
            </Typography>

            <Typography>
              Price: ₹{item.prodId?.productPrice}
            </Typography>

            <Typography>
              Qty: {item.Qty}
            </Typography>

            <Typography fontWeight="bold">
              Total: ₹{item.Qty * item.prodId?.productPrice}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    )
  })}
</Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h6">Order Details</Typography>

          <Typography>
            <strong>Order ID:</strong> {order._id}
          </Typography>

          <Typography>
            <strong>Status:</strong> {order.orderStatus}
          </Typography>

          <Typography>
            <strong>Total Amount:</strong> ₹{order.orderAmount}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Customer Name:</strong>{" "}
            {order.userId?.firstName} {order.userId?.lastName}
          </Typography>

          <Typography>
            <strong>Email:</strong> {order.userId?.email}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            <strong>Address:</strong><br />
            {order.userId?.address?.street},{" "}
            {order.userId?.address?.city},{" "}
            {order.userId?.address?.state},{" "}
            {order.userId?.address?.country} -{" "}
            {order.userId?.address?.postalCode}
          </Typography>
        </Card>
      </Grid>

        
    </Grid>
  )
}

export default OrdersDetail