import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'; 
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

const CustomerLayout = () => {
    let navigate = useNavigate()

    const [isOpen , setisOpen] = useState(false)

    let handleOpen = ()=>{
        setisOpen(true)
    }
    let handleClose = ()=>{
        setisOpen(false)
    }
  return (
    <>
     {/* <Box sx={{ flexGrow: 1 }}>
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
                        
                        <Button color="inherit" onClick={()=>{navigate("home")}} >Home</Button>
                        <Button color="inherit" onClick={()=>{navigate("product")}}>Product</Button>
                        <Button color="inherit" onClick={()=>{navigate("contact")}}>Contact</Button>
                        <Button color="inherit" onClick={()=>{navigate("aboutus")}}>AboutUs</Button>
                        <Button color="inherit" onClick={()=>{navigate("customereviews")}}>Reviews</Button>
                        <Button color="inherit" onClick={()=>{navigate("cart")}}>Cart</Button>
                        <Button color="inherit" onClick={()=>{navigate("profile")}}>Profile</Button>
                        <Button color="inherit" onClick={()=>{navigate("checkout")}}>CheckOut</Button>
                        <Button color="inherit" onClick={()=>{navigate("customerorders")}}>Orders</Button>

                        <Button color="inherit" onClick={()=>{navigate("/")}}>Login</Button>
                        <Button color="inherit" onClick={()=>{navigate("/registration")}}>Registration</Button>
                         </Toolbar>
                </AppBar>
            </Box> */}

        <Box>
          <Outlet/>
        </Box>

            <Drawer sx={{'& .MuiDrawer-paper': {  width: 300, height: '100vh' }}} anchor='left' open={isOpen} onClick={handleClose}>
                
        <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>

        <List>
          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("home")}}>
              {/* <ListItemIcon>
                <InboxIcon />
              </ListItemIcon> */}
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("product")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Product" />
            </ListItemButton>
          </ListItem>

          <Divider/>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("contact")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Contact" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("aboutus")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="AboutUs" />
            </ListItemButton>
          </ListItem>

          <Divider/>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("customereviews")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="CustomeReviews" />
            </ListItemButton>
          </ListItem>
       
        <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("cart")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>
         </List> 

            <Divider/>

         <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("/")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

       <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("/registration")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Registration" />
            </ListItemButton>
          </ListItem>
  
    </Box>
    </Drawer>
    
    </>
  )
}

export default CustomerLayout