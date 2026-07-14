import {Alert,Box,Button,CircularProgress,TextField,Typography,FormControl,FormLabel,RadioGroup,FormControlLabel,Radio, AppBar, Toolbar, IconButton} from "@mui/material";
import axios from "axios";
import React, { useActionState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const registerUser = async (prevState, formData) => {

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    // const mobileNumber = formData.get("mobileNumber");
    const email = formData.get("email");
    const password = formData.get("password");
    const age = formData.get("age");
    const gender = formData.get("gender");

    const street = formData.get("street");
    const city = formData.get("city");
    const state = formData.get("state");
    const postalCode = formData.get("postalCode");

    //  Validation
    if (!firstName ||!lastName ||!email || !password || !street || !city || !state || !postalCode) {
      return {
        success: false,
        message: "All Fields are Requred"
      }; 
    }

    const reqBody = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      age,
      gender,
      address: {
        street,
        city,
        state,
        postalCode
      }
    };

    try {
      // const res = await axios.post("http://localhost:5000/api/auth/register", reqBody, {

      const res = await axios.post(" https://e-commerce-ewhg.onrender.com/api/auth/register", reqBody, {


        
        headers:{
        "Content-Type":"application/json"
      }
      });
      

      return {
        success: true,
        message: res.data.message
      };

    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed"
      };
    }
  };

  const [state, formAction, pending] = useActionState(registerUser, {
    success: false,
    message: ""
  });

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
                </Box>


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
        User Registration
      </Typography>

      {state.message && (
        <Alert severity={state.success ? "success" : "error"} sx={{ mb: 2 }}>
          {state.message}
        </Alert>
      )}

      <TextField name="firstName" label="First Name" fullWidth required margin="normal" />
      <TextField name="lastName" label="Last Name" fullWidth margin="normal" />
      {/* <TextField
  name="mobileNumber"
  label="Mobile Number"
  fullWidth
  required
  margin="normal"
  inputProps={{ maxLength: 10 }}
/> */}
      <TextField name="email" label="Email" type="email" fullWidth required margin="normal" />
      <TextField name="password" label="Password" type="password" fullWidth required margin="normal" />
      <TextField name="age" label="Age" type="number" fullWidth margin="normal" />

     

      <Typography variant="h6" mt={2}>Address</Typography>

      <TextField name="street" label="Street" fullWidth required margin="normal" />
      <TextField name="city" label="City" fullWidth required margin="normal" />
      <TextField name="state" label="State" fullWidth required margin="normal" />
      <TextField name="postalCode" label="Postal Code" type="number" fullWidth required margin="normal" />

      <FormControl margin="normal">
        <FormLabel>Gender</FormLabel>
        <RadioGroup row name="gender">
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={pending}
        sx={{ mt: 2 }}
      >
        {pending ? <CircularProgress size={24} /> : "Register"}
      </Button>
    </Box>
    </>
        
  );
};

export default Register;