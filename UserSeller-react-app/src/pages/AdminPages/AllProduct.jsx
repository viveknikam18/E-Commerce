
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AllProduct = () => {

  const [ProductData, setProductData] = useState([])
  const userData = useSelector((state) => state.user.userData)

  const [updatePriceDialogOpen, setupdatePriceDialogOpen] = useState(false)
  const [selectedProduct, setselectedProduct] = useState(null)

  const [priceForm, setpriceForm] = useState({
    productPrice: 0
  })

  const [priceState, setpriceState] = useState({
    loading: false,
    success: false,
    message: ''
  })

  // Fetch Products
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios.get("http://localhost:5000/api/fetchproduct")
      // const result = await axios.get("https://e-commerce-ewhg.onrender.com/api/fetchproduct")
      setProductData(result.data.data)
    }
    fetchProduct()
  }, [])

  // Open Dialog
  const handleOpenPriceDialog = (product) => {
    setselectedProduct(product)
    setpriceForm({ productPrice: product.productPrice || 0 })
    setpriceState({ loading: false, success: false, message: '' })
    setupdatePriceDialogOpen(true)
  }

  // Close Dialog
  const handleClosePriceDialog = () => {
    setupdatePriceDialogOpen(false)
    setselectedProduct(null)
    setpriceForm({ productPrice: 0 })
    setpriceState({ loading: false, success: false, message: '' })
  }

  // Update Price API
  const postPrice = async () => {
    if (!selectedProduct?._id) {
       setpriceState({
        loading: false,
        success: false,
        message: 'Product ID is missing'
      })
      return
    }

    if (!userData?._id) {
       setpriceState({
        loading: false,
        success: false,
        message: 'Please login first'
      })
      return
    }

    try {
      setpriceState({ loading: true, success: false, message: '' })

      const reqBody = {
        userId: userData._id,
        _id: selectedProduct._id,
        productPrice: priceForm.productPrice
      }

      const { data } = await axios.put(
        "http://localhost:5000/api/updateproductprice",
        reqBody
      )
      //  const { data } = await axios.put(
      //   "https://e-commerce-ewhg.onrender.com/api/updateproductprice",
      //   reqBody
      // )

      

      setpriceState({
        loading: false,
        success: true,
        message: data.message || 'Price updated successfully'
      })

      // Update UI instantly
      setProductData(prev =>
        prev.map(p =>
          p._id === selectedProduct._id
            ? { ...p, productPrice: priceForm.productPrice }
            : p
        )
      )

      setTimeout(handleClosePriceDialog, 800)

    } catch (error) {
      setpriceState({
        loading: false,
        success: false,
        message: error.response?.data?.message || 'Update failed'
      })
    }
  }

  return (
    <>
      <Grid container spacing={2}>
        {ProductData.map((prod) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={prod._id}>
            <Card>
              <CardMedia
                component="img"
                sx={{ height: 320 }}
                image={`http://localhost:5000/uploads/${prod.prodImage}`}
              />

               {/* <CardMedia
                component="img"
                sx={{ height: 320 }}
                image={`https://e-commerce-ewhg.onrender.com/uploads/${prod.prodImage}`}
              /> */}


              
              <CardContent>
                <Typography>{prod.productName}</Typography>
                <Typography>₹{prod.productPrice}</Typography>
                <Typography>{prod.productCategory}</Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  onClick={() => handleOpenPriceDialog(prod)}
                >
                  Update Price
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={updatePriceDialogOpen} onClose={handleClosePriceDialog}>
        <DialogTitle>Update Price</DialogTitle>

        <DialogContent>
          <Typography>{selectedProduct?.productName}</Typography>

          {priceState.message && (
            <Alert severity={priceState.success ? 'success' : 'error'}>
              {priceState.message}
            </Alert>
          )}

          <Stack spacing={2} mt={2}>
            <TextField
              label="Price"
              type="number"
              fullWidth
              value={priceForm.productPrice}
              onChange={(e) =>
              setpriceForm({ productPrice: Number(e.target.value) })
}
            />

            <Button
              variant="contained"
              onClick={postPrice}
              disabled={priceState.loading}
            >
              {priceState.loading ? "Updating..." : "Save"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AllProduct