import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'; 

const MyAppBar = () => {
    let navigate = useNavigate
  return (
     <>
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}

                        >
                            {/* <MenuIcon /> */}
                    </IconButton>
                        <Button color="inherit" onClick={()=>{navigate("/")}} >Home</Button>
                        <Button color="inherit" onClick={()=>{navigate("/about")}}>About Us</Button>
                        <Button color="inherit" onClick={()=>{navigate("/services")}}>Services</Button>
                        <Button color="inherit" onClick={()=>{navigate("/contact")}}>Contact Us</Button>
                        <Button color="inherit" >Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
    </>
  )
}

export default MyAppBar