import React, { useState } from 'react'
import { Box,Typography,Card,CardContent,CardMedia,Grid, Button, Dialog, DialogTitle, DialogContent, Alert, Stack, Rating, TextField, DialogActions, CircularProgress, Tooltip, IconButton, AppBar, Toolbar, Drawer, List, ListItem, ListItemButton, ListItemText, Divider, ListItemIcon, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import RateReviewIcon from '@mui/icons-material/StarPurple500';
import { Title } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu';

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const CustoOrdersDetail = () => {

  const [isOpen , setisOpen] = useState(false)
    let handleOpen = ()=>{
          setisOpen(true)
      }
      let handleClose = ()=>{
          setisOpen(false)
      }

  const navigate = useNavigate()
  const userData = useSelector((state) => state.user.userData)
  
  const [selectProduct, setselectProduct] = useState(null)
  const [filteredproductData, setfilteredproductData] = useState([])
  const [selectedCategory, setselectedCategory] = useState("all")
  const [reviewDialogOpen, setreviewDialogOpen] = useState(false)

  const [reviweForm, setreviweForm] = useState({
      rating: 0,
      comment:''
    })
  
    const [reviewState, setreviewState] = useState({
      loading: false,
      success: false,
      message: ''
    })
  
  const location = useLocation()
  const order = location.state || {}

 


  // Payment Dialog State
const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
const [selectPayMode, setselectPayMode] = useState("COD")

if (!order.ordersItems) {
  return <Typography>No order details found</Typography>;
}

let cancleOrderReq = async ()=>{
  let reqBody = {
    orderId: order?._id,
    orderStatus:"cancel"
  }
  try {
    // let result = await axios.put("http://localhost:5000/api/updateorder", reqBody)
    let result = await axios.put("https://e-commerce-ewhg.onrender.com/api/updateorder", reqBody)

    
    alert("Order Cancle")
    navigate("/customer/product")
  } catch (error) {
    console.log(error)
  }

}
 
//Payment

let PaymentCreate = async ()=>{
  let ReqBody = {
      orderId: order?._id,
      userId: userData?._id,
      amount: order?.orderAmount,
      paymentMode: selectPayMode,
      paymentStatus: "success"
  }
  try {
    // let result = await axios.put("http://localhost:5000/api/paymentupdate",ReqBody)
    let result = await axios.put(" https://e-commerce-ewhg.onrender.com/api/paymentupdate",ReqBody)

   
     alert("Payment Successful")
    handleClosePayment()
    navigate("/customer/customerorders")
  } catch (error) {
    console.log(error)
    alert("Payment Failed")
  }
}


const handleOpenPayment = () => {
  setPaymentDialogOpen(true)
}

const handleClosePayment = () => {
  setPaymentDialogOpen(false)
}


const handleOpenReviweDialog = (product) =>{
    setselectProduct(product)
    setreviweForm({
      rating: 0,
      comment: ''
    })
    setreviewState({
      loading: false,
      success: false,
      message: ''
    })
    setreviewDialogOpen(true)
  }

  const handleCloseReviewDialog = ()=>{
    setreviewDialogOpen(false)
    setselectProduct(null)
    setreviweForm({
      rating: 0,
      comment: ''
    })
    setreviewState({
      loading: false,
      success: false,
      message: ''
    })
  }

  const postReview = async()=>{
    if(!selectProduct?._id){
      setreviewState({
        loading: false,
        success: false,
        message: 'Product details are missing.'
      })
      return
    }
    if(!userData?._id){
      setreviewState({
        loading: false,
        success: false,
        message: 'Please login before posting a review.'
      })
      return
    }

    if (!reviweForm.rating){
      setreviewState({
        loading:false,
        success: false,
        message: 'Please select a rating.'
      })
      return
    }
    if(!reviweForm.comment.trim()){
      setreviewState({
        loading: false,
        success: false,
        message: 'Please Enter Your Comment.'
      })
      return
    }
    setreviewState({
      loading: true,
      success: false,
      message: ''
    })

    try {
      const reqBody={
        userId: userData._id,
        prodId: selectProduct._id,
        rating: reviweForm.rating,
        comment: reviweForm.comment.trim()
      }
      // const {data}= await axios.post('http://localhost:5000/api/createreview',reqBody)

      const {data}= await axios.post('https://e-commerce-ewhg.onrender.com/api/createreview',reqBody)


       

      setreviewState({
        loading: false,
        success: true,
        message: data.message || 'Review posted successfully.'
      })
      
      setTimeout(() => {
        handleCloseReviewDialog()
      }, 800);
    } catch (error) {
      setreviewState({
        loading: false,
        success: false,
        message: error.response?.data?.message || 'Unable to post review. Please try again.'
      })
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



     <Grid container spacing={3} sx={{ p: 2 }}>

      
      <Grid container spacing={2}>
  {order.ordersItems.map((item) => {
    return (
      <Grid item xs={12} sm={6} md={4} key={item._id || item.prodId?._id}>
        <Card sx={{ height: '100%' }}>
          <CardMedia
            sx={{ height: 200 }}
            component="img"
            // src={`http://localhost:5000/uploads/${item.prodId?.prodImage}`}

            src={`https://e-commerce-ewhg.onrender.com/uploads/${item.prodId?.prodImage}`}

            alt={item.prodId?.productName || "Product"}
          />

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

          <Box>
              <Tooltip title='Post Review'>
               <IconButton onClick={()=> handleOpenReviweDialog(item)} color='primary'>
                <Typography variant='h6'>Reviews</Typography>
              <RateReviewIcon/>
            </IconButton>
           </Tooltip>
          </Box>


        </Card>
      </Grid>
    )
  })}
</Grid>

<Dialog open={reviewDialogOpen} onClose={handleCloseReviewDialog} fullWidth maxWidth='sm'>
        <DialogTitle>Post Review</DialogTitle>
        <DialogContent>
          <Typography variant='h6' sx={{mb:2}}>{selectProduct?.prodId?.productName}</Typography>

          {reviewState.message && (
            <Alert severity={reviewState.success? 'success' : 'error'} sx={{mb:2}}>{reviewState.message}</Alert>
          )}

          <Stack>
            <Box>
              <Typography variant='body2' sx={{mb: 1}}>Rating</Typography>

              <Rating value={reviweForm.rating}
              onChange={(_, value)=>{
                setreviweForm((prev)=>({
                  ...prev,
                  rating: value ?? 0
                }))
              }}/>
            </Box>

            <TextField 
            label='Comment' 
            multiline 
            minRows={4} 
            fullWidth 
            value={reviweForm.comment}
            onChange={(event)=>{
              const {value} = event.target 
              setreviweForm((prev)=>({
                ...prev,
                 comment :value
                 }))
               }} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewDialog}>Close</Button>
          <Button onClick={postReview} variant='contained' disabled={reviewState.loading}>{reviewState.loading? <CircularProgress size={22} color='inherit'/>: 'Submit'}</Button>
        </DialogActions>

      </Dialog>

      <Dialog open={paymentDialogOpen} onClose={handleClosePayment} fullWidth maxWidth="sm">
  <DialogTitle>Payment</DialogTitle>

  <DialogContent>
    <Typography variant="h6" sx={{ mb: 2 }}>
      Total Amount: ₹{order?.orderAmount}
    </Typography>

    <RadioGroup
      value={selectPayMode}
      onChange={(e) => setselectPayMode(e.target.value)}
    >
      <FormControlLabel value="COD" control={<Radio />} label="Cash On Delivery" />
      <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
      <FormControlLabel value="Debit / Credit Card" control={<Radio />} label="Debit / Credit Card" />
      <FormControlLabel value="NetBanking" control={<Radio />} label="Net Banking" />
      <FormControlLabel value="Wallet" control={<Radio />} label="Wallet" />
    </RadioGroup>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClosePayment}>Cancel</Button>
    <Button variant="contained" onClick={PaymentCreate}>
      Pay Now
    </Button>
  </DialogActions>
</Dialog>

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
            {/* <strong>Total Amount:</strong> ₹{totalAmount} */}

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
          <Button variant='contained' sx={{height:'50px'}} onClick={()=> cancleOrderReq()}>Cancle Order</Button>

          <Button variant="contained" sx={{ height: '50px', marginLeft: "5px" }} onClick={handleOpenPayment}> Pay Online</Button>

        </Card>
      </Grid>    
    </Grid>
    </>
   
  )
}

export default CustoOrdersDetail