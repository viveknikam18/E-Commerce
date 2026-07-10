import { Alert, Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'

const AddProduct = () => {
  //  const {pending} = useFormStatus()

  const [selectedImage, setselectedImage] = useState(null)
    
  let AddProd = async (prevState, formData) =>{
      const productName = formData.get("productName");
      const productDescription = formData.get("productDescription");
      const productPrice = formData.get("productPrice");
      const productStock = formData.get("productStock");
      const productCategory = formData.get("productCategory");
      const prodBrand = formData.get("prodBrand");
      
      

      //validation
      if(!productName || !productDescription || !productPrice || !productStock || !productCategory || !prodBrand){

         return{
          success:false,
          message:"All Fields are Requred",
      };
      }
       
      let reqBody ={
        productName,
        productDescription,
        productPrice,
        productStock,
        productCategory,
        prodBrand,
        prodImage:selectedImage
      }

    //simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    let result = await axios.post("http://localhost:5000/api/createproduct", reqBody,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })

    return{
      success:true,
      message:`Product add Successfully`,
      product:result
  
    };
  }

    const [state, formAction, pending] = useActionState(AddProd,{
      success:false,
      message:""
    })
   

  return (
    <>
    <Box key={state.success ? 'reset' : 'form'}
     component="form"
     action={formAction}
      sx={{
      maxWidth:420,
      mx:"auto",
      mt:6,
      p:3,
      borderRadius:2,
      boxShadow:3,
      }}>
      
      <Typography variant='h5' align='center' gutterBottom>Add Product</Typography>

      {state.message && (
        <Alert severity={state.success? "success": "error"} sx={{mb:2}} >

          {state.message}
        </Alert>
      )}

      <TextField
      name='productName'
      label='Product Name' 
      fullWidth
      required
      margin='normal'/>

      <TextField
      name='productDescription'
      label='Product Description' 
      fullWidth
      required
      margin='normal'/>

      <TextField
      name='productPrice'
      label='Product Price' 
      fullWidth
      required
      margin='normal'/>

      <TextField 
      name='productStock'
      label='Product Stock' 
      fullWidth
      required
      margin='normal'/>

      <TextField 
      name='prodBrand'
      label='Product Brand' 
      fullWidth
      required
      margin='normal'/>

       <TextField 
      type='file'
      onChange={(e)=>setselectedImage(e.target.files[0])}
      name='prodImage' 
      fullWidth
      required
      margin='normal'/>
      
      <FormControl margin='normal'>

        <FormLabel>Product Category</FormLabel>
          <RadioGroup row name='productCategory'>
              {/* <FormControlLabel value="Beauty" control={<Radio/>} label="Beauty" /> */}
              <FormControlLabel value="Electronics" control={<Radio/>} label="Electronics" />
              <FormControlLabel value="Sports & Fitness" control={<Radio/>} label="Sports & Fitness"/>
              <FormControlLabel value="Fashion & Clothing" control={<Radio/>} label="Fashion & Clothing"/>

          </RadioGroup>
      </FormControl>

      <Button
      type='Submit'
      variant='contained'
      fullWidth
      disabled={pending}
      > 
          {pending ? <CircularProgress size={24} /> : "Add Product"}
      </Button>
      </Box>    
    </>
  )
}

export default AddProduct