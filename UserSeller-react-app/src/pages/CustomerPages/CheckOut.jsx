
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, Grid, Divider, Button, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'; 

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const CheckOut = () => {

  const navigate = useNavigate()
  const userData = useSelector((state) => state.user?.userData)

  const { cartItem, totalAmount, totalQuantity } = useSelector((state) => state.cart )

  const [isOpen , setisOpen] = useState(false)
    let handleOpen = ()=>{
          setisOpen(true)
      }
      let handleClose = ()=>{
          setisOpen(false)
      }

  let createOrderReq = async () => {
  if (!userData || cartItem.length === 0) {
    alert("Invalid order data")
    return
  }

  let finalOrdersItems = cartItem.map(item => ({
    prodId: item?._id,
    Qty: item?.quantity
  }))

  console.log(finalOrdersItems)

  let reqBody = {
    userId: userData?._id,
    orderAmount: totalAmount,
    ordersItems: finalOrdersItems
  }

  try {
    let result = await axios.post("http://localhost:5000/api/ordercreate", reqBody)

    // let result = await axios.post("    https://e-commerce-ewhg.onrender.com/api/ordercreate", reqBody)


    alert("Orders Created")
    navigate("/customer/customerorders")
  } catch (error) {
    console.log(error)
    alert("error")
  }
}


  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                onClick={() => handleOpen()}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            
                            <Button color="inherit" onClick={()=>{navigate("/customer/home")}} >Home</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/product")}}>Product</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/contact")}}>Contact</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/aboutus")}}>AboutUs</Button>
                            {/* <Button color="inherit" onClick={()=>{navigate("/customer/customereviews")}}>Reviews</Button> */}
                            <Button color="inherit" onClick={()=>{navigate("/customer/cart")}}>Cart</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/profile")}}>Profile</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/checkout")}}>CheckOut</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/customerorders")}}>Orders</Button>
    
                            <Button color="inherit" onClick={()=>{navigate("/")}}>Login</Button>
                            <Button color="inherit" onClick={()=>{navigate("/registration")}}>Registration</Button>
                             </Toolbar>
                    </AppBar>
                </Box>

                <Drawer sx={{'& .MuiDrawer-paper': {  width: 300, height: '100vh' }}} anchor='left' open={isOpen} onClick={handleClose}>
                            
                    <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/home")}}>
                          <ListItemIcon>
                            <HomeIcon />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/product")}}>
                          <ListItemIcon>
                            <CategoryIcon />
                          </ListItemIcon>
                          <ListItemText primary="Product" />
                        </ListItemButton>
                      </ListItem>
            
                      <Divider/>
            
                      <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/contact")}}>
                          <ListItemIcon>
                            <ContactPageIcon />
                          </ListItemIcon>
                          <ListItemText primary="Contact" />
                        </ListItemButton>
                      </ListItem>
            
                      <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/aboutus")}}>
                          <ListItemIcon>
                            <ShoppingCartIcon />
                          </ListItemIcon>
                          <ListItemText primary="AboutUs" />
                        </ListItemButton>
                      </ListItem>
            
                      <Divider/>
            
                      {/* <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/customereviews")}}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="CustomeReviews" />
                        </ListItemButton>
                      </ListItem> */}
                   
                    <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/customer/cart")}}>
                          <ListItemIcon>
                            <PrivacyTipIcon />
                          </ListItemIcon>
                          <ListItemText primary="Cart" />
                        </ListItemButton>
                      </ListItem>
                     </List> 
            
                        <Divider/>
            
                     <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/")}}>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </ListItemButton>
                      </ListItem>
            
                   <ListItem disablePadding>
                        <ListItemButton color="inherit" onClick={()=>{navigate("/registration")}}>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Registration" />
                        </ListItemButton>
                      </ListItem>
              
                </Box>
                </Drawer>

    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Checkout
      </Typography>

      {/* USER DETAILS */}
      <Box sx={{ mb: 3, p:3, border: '1px solid #ccc',
                borderRadius: 2 }}>
        <Typography variant="h5" sx={{p:1}}><strong>User Details</strong></Typography>

        {userData ? (
          <Box>

            <Typography><strong>First Name:</strong> {userData?.firstName} {userData?.lastName}</Typography>
            <Typography><strong>Last Name:</strong> {userData?.email} </Typography>

            <Typography>
                <strong>Address:</strong>{" "}
                  {userData?.address?.street},{" "}
                  {userData?.address?.city},{" "}
                  {userData?.address?.state},{" "}
                  {userData?.address?.country} -{" "}
                  {userData?.address?.postalCode}
            </Typography>

          </Box>
        ) 
        : (
          <Typography>No user data found.</Typography>
        )
        }

      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* CART ITEMS */}
      <Typography variant="h6">Order Summary</Typography>

      {cartItem?.length > 0 ? (
        <>
          {cartItem.map((item) => (
            <Box
              key={item._id}
              sx={{
                mb: 2,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                
                {/* Image */}
                <Grid item xs={12} sm={4} md={3}>
                  <Box
                    component="img"
                    src={`http://localhost:5000/uploads/${item.prodImage}`}

                    // src={`https://e-commerce-ewhg.onrender.com/uploads/${item.prodImage}`}

                    alt={item.productName}
                    sx={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                </Grid>

                {/* Details */}
                <Grid item xs={12} sm={8} md={6}>
                  <Typography>
                    <strong>{item.productName}</strong>
                  </Typography>
                  <Typography>Price: ₹{item.productPrice || 0}</Typography>
                  <Typography>Qty: {item.quantity}</Typography>
                </Grid>

                {/* Total */}
                <Grid item xs={12} md={3}>
                  <Typography>
                    <strong>
                    Total Price:-   ₹{(item.productPrice || 0) * item.quantity}
                    </strong>
                  </Typography>
                </Grid>

              </Grid>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* TOTAL SUMMARY */}
          <Box>
            <Typography>
              <strong>Total Quantity:</strong> {totalQuantity}
            </Typography>

            <Typography>
              <strong>Total Amount:</strong> ₹{totalAmount}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => createOrderReq()}
          >
            Place Order
          </Button>
        </>
      ) : (
        <Typography>No items in cart.</Typography>
      )}
    </Box>
    </>
      
  )
}

export default CheckOut

