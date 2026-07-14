import { Alert, AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, Stack, TextField, Toolbar, Tooltip, Typography} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItem } from '../../reducswork/CartSlice'
import { common } from '@mui/material/colors'
import RateReviewIcon from '@mui/icons-material/StarPurple500';
import MenuIcon from '@mui/icons-material/Menu'; 

import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Product = () => {

  const [isOpen , setisOpen] = useState(false)
    let handleOpen = ()=>{
          setisOpen(true)
      }
      let handleClose = ()=>{
          setisOpen(false)
      }

  const navigate = useNavigate()
  const userData = useSelector((state) => state.user.userData)

  const dispatcher = useDispatch()
  const [siDiaOpen, setsiDiaOpen] = useState(false)
  const [selectProduct, setselectProduct] = useState(null)
  const [productsData, setproductsData] = useState([])

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

  // Fetch products ONLY ONCE
  useEffect(()=>{
    let fetchProduct = async ()=>{
      // let result = await axios.get("http://localhost:5000/api/fetchproduct")
      // let result = await axios.get("http://localhost:5000/api/fetchProductWithAvarageReview")
      let result = await axios.get(" https://e-commerce-ewhg.onrender.com/api/fetchProductWithAvarageReview")


      setproductsData(result.data.data)
      setfilteredproductData(result.data.data)

      let filterResult = productsData.filter((p)=>p.productCategory == selectedCategory)
      setfilteredproductData(filterResult)

      if(selectedCategory == "all"){
        setfilteredproductData(result.data.data)
      }
    }
    fetchProduct()
  }, [selectedCategory, productsData])

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
      
      <Stack m={3} direction="row" spacing={1}>
      <Chip label="All" color={selectedCategory == "all" ? "success":"secondary"} variant='filled' onClick={()=>setselectedCategory("all")} sx={{height:"50px",width:"100px"}} />
      {/* <Chip label="Beauty" color={selectedCategory == "beauty" ? "success":"secondary"} variant="filled" onClick={()=>setselectedCategory("beauty")} sx={{height:"50px",width:"100px"}} /> */}
      <Chip label="Electronics" color={selectedCategory == "Electronics" ? "success":"secondary"} variant="filled" onClick={()=>setselectedCategory("Electronics")} sx={{height:"50px",width:"100px"}} />
      <Chip label="Sports & Fitness" color={selectedCategory == "Sports & Fitness" ? "success":"secondary"} variant="filled" onClick={()=>setselectedCategory("Sports & Fitness")} sx={{height:"50px",width:"150px"}} />
      <Chip label="Fashion & Clothing" color={selectedCategory == "Fashion & Clothing" ? "success":"secondary"} variant="filled" onClick={()=>setselectedCategory("Fashion & Clothing")} sx={{height:"50px",width:"150px"}} />
      </Stack>

      <Grid container spacing={2}>
        {
          filteredproductData.map((prod) => (
            
          <Grid item xs={12} sm={6} md={6} lg={3} sx={{}}>
              <Card>
                {/* <CardMedia sx={{ height: 320, width: "100%", objectFit: "cover"}} component="img" image={`http://localhost:5000/uploads/${prod.prodImage}`} /> */}
                <CardMedia sx={{ height: 320, width: "100%", objectFit: "cover"}} component="img" image={`https://e-commerce-ewhg.onrender.com/uploads/${prod.prodImage}`} />


                

                <CardContent>
                  <Typography variant='body1'>{prod.productName}</Typography>
                  <Typography variant='body1'>₹{prod.productPrice}</Typography>
                  <Typography variant='body1'>{prod.productCategory}</Typography>

                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Rating value={prod.averageRating || 0} precision={0.5} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}> ({prod.reviewCount || 0} reviews)</Typography>
                    </Box>
                </CardContent>
                
                <CardActions>

                  <Box>
                    <Tooltip title='Post Review'>
                      <IconButton onClick={()=> handleOpenReviweDialog(prod)} color='primary'>
                        <RateReviewIcon/>
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Button onClick={()=> dispatcher(addItem(prod))} >Add To Cart</Button>

                  <Button onClick={()=>{
                      // setselectedProduct(prod)
                      // setisDiglogOpen(true)
                      navigate("/customer/detail", { state: prod })
                    }} variant='contained'>Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      
      <Dialog open={reviewDialogOpen} onClose={handleCloseReviewDialog} fullWidth maxWidth='sm'>
        <DialogTitle>Post Review</DialogTitle>
        <DialogContent>
          <Typography variant='h6' sx={{mb:2}}>{selectProduct?.productName}</Typography>

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

        
      <Dialog open={siDiaOpen} onClose={() => setsiDiaOpen(false)}>
        <DialogTitle>Product Details</DialogTitle>
        <DialogContent>
          <Typography>{selectProduct?.productName}</Typography>
          <Typography>{selectProduct?.productDescription}</Typography>
          <Typography>Stock: {selectProduct?.productStock}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setsiDiaOpen(false)
            setselectProduct(null)
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Product

