
import { Box, List, ListItem, ListItemText, Typography, Divider, AppBar, Toolbar, IconButton, Button, Drawer, ListItemButton, ListItemIcon } from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'; 

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProductDetail = () => {
  const { state: prodData } = useLocation()
  const navigate = useNavigate()

  const [isOpen , setisOpen] = useState(false)
    let handleOpen = ()=>{
          setisOpen(true)
      }
      let handleClose = ()=>{
          setisOpen(false)
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


      {/* Product Section */}
      <Box sx={{ display: "flex", gap: 3, p: 2 }}>
        <Box
          component="img"
          // src={prodData?.prodImage}
          // src={`http://localhost:5000/uploads/${prodData.prodImage}`}

          src={` https://e-commerce-ewhg.onrender.com/uploads/${prodData.prodImage}`}

          alt={prodData?.productName}
          sx={{ width: 250, height: 300, objectFit: "cover" }}
        />

        <Box>
          <Typography variant='h6'>{prodData?.productName}</Typography>
          <Typography variant='body1'>₹{prodData?.productPrice}</Typography>
          <Typography variant='body2'>{prodData?.productCategory}</Typography>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Reviews</Typography>

        <List>
          {prodData?.reviews?.length > 0 ? (
            prodData.reviews.map((rev) => (
              <React.Fragment key={rev._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText primary={rev.userId?.name || "Anonymous"} secondary={
                      <>
                        <Typography variant="body2">
                          Rating: {rev.rating} ⭐
                        </Typography>
                        <Typography variant="body2">
                          {rev.comment}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2">No reviews yet</Typography>
          )}
        </List>
      </Box>
    </>
  )
}

export default ProductDetail