import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'; 
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


const AdminLayout = () => {
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
                        {/* <Typography variant='body1'>Admin Panel</Typography> */}
                        {/* <Button color="inherit" onClick={()=>{navigate("home")}} >Home</Button> */}
                        <Button color="inherit" onClick={()=>{navigate("dashboard")}}>Dashboard</Button>
                        <Button color="inherit" onClick={()=>{navigate("allproduct")}}>All Product</Button>
                        <Button color="inherit" onClick={()=>{navigate("allorders")}}>All Orders</Button>
                        <Button color="inherit" onClick={()=>{navigate("addproduct")}}>Add Product</Button>
                        <Button color="inherit" onClick={()=>{navigate("reviews")}}>Reviews</Button>

                        <Button color="inherit" onClick={()=>{navigate("/")}}>Login</Button>
                        <Button color="inherit" onClick={()=>{navigate("/registration")}}>Registration</Button>
                         </Toolbar>
                </AppBar>
            </Box>

        <Box>
          <Outlet/>
        </Box>
        
            <Drawer sx={{'& .MuiDrawer-paper': {  width: 300, height: '100vh' }}} anchor='left' open={isOpen} onClick={handleClose}>
                
        <Box sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>

        <List>

          {/* <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("/")}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem> */}
          
          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("dashboard")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>

          <Divider/>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("allproduct")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="All Product" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("addproduct")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Add Product" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("reviews")}}>
              {/* <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon> */}
              <ListItemText primary="Reviews" />
            </ListItemButton>
          </ListItem>

          <Divider/>

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={()=>{navigate("/login")}}>
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
        </List> 
        
    </Box>
    
    </Drawer>
    
    </>
  )
}

export default AdminLayout