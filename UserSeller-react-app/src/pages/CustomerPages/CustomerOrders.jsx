import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
  ListItemIcon
} from "@mui/material";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CustomerOrders = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);

  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    if (!userData?._id) return;

    const fetchAllOrders = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5000/api/fetchordersbyuserid/${userData._id}`
        );

        setOrdersData(
          Array.isArray(result.data.data) ? result.data.data : []
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, [userData]);

  // ✅ Total spend across all orders (optional)
  const totalAmount = ordersData.reduce((acc, order) => {
    const orderTotal = order.ordersItems?.reduce((sum, item) => {
      return (
        sum +
        (item?.prodId?.productPrice || 0) * (item?.Qty || 0)
      );
    }, 0);

    return acc + orderTotal;
  }, 0);

  return (
    <>
      {/* Navbar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={handleOpen}
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Button color="inherit" onClick={() => navigate("/customer/home")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/customer/product")}>Product</Button>
            <Button color="inherit" onClick={() => navigate("/customer/contact")}>Contact</Button>
            <Button color="inherit" onClick={() => navigate("/customer/aboutus")}>AboutUs</Button>
            <Button color="inherit" onClick={() => navigate("/customer/cart")}>Cart</Button>
            <Button color="inherit" onClick={() => navigate("/customer/profile")}>Profile</Button>
            <Button color="inherit" onClick={() => navigate("/customer/checkout")}>CheckOut</Button>
            <Button color="inherit" onClick={() => navigate("/customer/customerorders")}>Orders</Button>
            <Button color="inherit" onClick={() => navigate("/")}>Login</Button>
            <Button color="inherit" onClick={() => navigate("/registration")}>Registration</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Drawer */}
      <Drawer
        sx={{ "& .MuiDrawer-paper": { width: 300 } }}
        anchor="left"
        open={isOpen}
        onClose={handleClose}
      >
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customer/home")}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customer/product")}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary="Product" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customer/contact")}>
                <ListItemIcon><ContactPageIcon /></ListItemIcon>
                <ListItemText primary="Contact" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customer/aboutus")}>
                <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                <ListItemText primary="AboutUs" />
              </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/customer/cart")}>
                <ListItemIcon><PrivacyTipIcon /></ListItemIcon>
                <ListItemText primary="Cart" />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/registration")}>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Registration" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      {/* Content */}
      <Box p={3}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Customer Orders
        </Typography>


        {loading ? (
          <Typography>Loading orders...</Typography>
        ) : (
          <Grid container spacing={3}>
            {ordersData.map((order) => (
              <Grid item xs={12} key={order._id}>
                <Card sx={{ p: 2, border: "1px solid #ccc" }}>
                  <Typography>
                    <strong>Order ID:</strong> {order._id}
                  </Typography>

                  <Typography sx={{ mt: 1 }}>
                    <strong>Total Amount:</strong> ₹
                    {order.ordersItems?.reduce((total, item) => {
                      return (
                        total +
                        (item?.prodId?.productPrice || 0) *
                          (item?.Qty || 0)
                      );
                    }, 0)}
                  </Typography>

                  <Typography>
                    <strong>Status:</strong> {order.orderStatus}
                  </Typography>

                  <Typography sx={{ mb: 2 }}>
                    <strong>Items Count:</strong>{" "}
                    {order.ordersItems?.length}
                  </Typography>

                  <Grid container spacing={2}>
                    {order.ordersItems?.map((item, index) => {
                      const product = item?.prodId;

                      return (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                          <Card sx={{ height: "100%" }}>
                            <CardContent>
                              <Typography variant="h6">
                                {product?.productName || "No Name"}
                              </Typography>

                              <Typography color="text.secondary">
                                ₹{product?.productPrice || 0}
                              </Typography>

                              <Typography>
                                Qty: {item.Qty}
                              </Typography>

                              <Box mt={1}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  onClick={() =>
                                    navigate("/customer/ordersdetail", {
                                      state: order
                                    })
                                  }
                                >
                                  Details
                                </Button>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default CustomerOrders;