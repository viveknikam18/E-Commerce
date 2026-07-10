import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'; 

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AboutUs = () => {
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


                {/* <div>AboutUs</div> */}
                <Typography>AboutUs</Typography>
    </>
  )
}

export default AboutUs