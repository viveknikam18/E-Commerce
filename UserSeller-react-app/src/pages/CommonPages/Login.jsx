import { Alert, AppBar, Box, Button, CircularProgress, IconButton, TextField, Toolbar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../../reducswork/UserSlice'
import MenuIcon from '@mui/icons-material/Menu'; 

const Login = () => {

  // const navigator = useNavigate()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginUser = async (prevState, formData) => {

    const email = formData.get("email") ?.trim()
    const password = formData.get("password");
         
      //validation
          if (!email || !password ) {

         return {
        success: false,
        message: "Email and Password are Requred"
      };
    }
       
       const reqBody = {
        email,
        password,
       }
   
   try {
      const {data} = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      
      dispatch(login(data.data ?? null))
        navigate ("/customer")
        

      return {
        success: data.success,
        message: data.message,
        user: data.data ?? null
      };

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed"
      };
    }
  };

  const [state, formAction, pending] = useActionState(loginUser, {
    success: false,
    message: ""
  });

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
                            
                            <Button color="inherit" onClick={()=>{navigate("/customer/home")}} >Home</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/product")}}>Product</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/contact")}}>Contact</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/aboutus")}}>AboutUs</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/customereviews")}}>Reviews</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/cart")}}>Cart</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/profile")}}>Profile</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/checkout")}}>CheckOut</Button>
                            <Button color="inherit" onClick={()=>{navigate("/customer/customerorders")}}>Orders</Button>
    
                            <Button color="inherit" onClick={()=>{navigate("/")}}>Login</Button>
                            <Button color="inherit" onClick={()=>{navigate("/registration")}}>Registration</Button>
                             </Toolbar>
                    </AppBar>
                </Box> */}


    <Box
      key={state.success ? "reset" : "form"}
      component="form"
      action={formAction}
      sx={{
        maxWidth: 420,
        mx: "auto",
        mt: 6,
        p: 3,
        borderRadius: 2,
        boxShadow: 3
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        User Login
      </Typography>

      {state.message && (
        <Alert severity={state.success ? "success" : "error"} sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}

      <TextField name="email" label="Email" type="email" fullWidth required margin="normal" />
      <TextField name="password" label="Password" type="password" fullWidth required margin="normal" />
     

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={pending}
        sx={{ mt: 2 }}
      >
        {pending ? <CircularProgress size={24} /> : "Login"}
      </Button>

      <Button onClick={()=>navigate("/registration")} fullWidth variant='contained' sx={{mt:2}}>Registration</Button>

    </Box>
  
  </>
       
  );
};

export default Login
