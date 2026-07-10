
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MyAppBar from './component/MyAppBar'
import AdminLayout from './layout/AdminLayout'

import Home from './pages/CustomerPages/Home'
import Dashboard from './pages/AdminPages/Dashboard'
import AllProduct from './pages/AdminPages/AllProduct'
import AddProduct from './pages/AdminPages/AddProduct'
import Reviews from './pages/AdminPages/Reviews'
import OrdersDetail from './pages/AdminPages/OrdersDetail'


import CustomerLayout from './layout/CustomerLayout'

import Contact from './pages/CustomerPages/Contact'
import AboutUs from './pages/CustomerPages/AboutUs'
import CustomeReviews from './pages/CustomerPages/CustomeReviews'
import Login from './pages/CommonPages/Login'
import Registration from './pages/CommonPages/Registration'
import Product from './pages/CustomerPages/Product'
import ProductDetail from './pages/CustomerPages/ProductDetail'
import Profile from './pages/CustomerPages/Profile'
import Cart from './pages/CustomerPages/Cart'
import CheckOut from './pages/CustomerPages/CheckOut'
import ProtectedRoute from './component/ProtectedRoute'
import CustomerOrders from './pages/CustomerPages/CustomerOrders'
import AllOrders from './pages/AdminPages/AllOrders'
import CustoOrdersDetail from './pages/CustomerPages/CustoOrdersDetail'


const App = () => {
  

  return (
    <>
    {/* <MyAppBar/> */}
    {/* <AdminLayout/> */}
    {/* <CustomerLayout/> */}

    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registration' element={<Registration />} />

  {/* Customer Routes */}

  {/* <Route element={<ProtectedRoute/>}  > */}
  
    <Route path='/customer' element={<CustomerLayout />}>
    <Route index element={<Home />} />
    <Route path='home' element={<Home />} />
    <Route path='product' element={<Product/>} />
    <Route path='contact' element={<Contact />} />
    <Route path='aboutus' element={<AboutUs />} />
    <Route path='customereviews' element={<CustomeReviews />} />
    <Route path='cart' element={<Cart/>} />
    <Route path="detail" element={<ProductDetail />} />
    <Route path="customerorders" element={<CustomerOrders />} />
    <Route path="profile" element={<Profile/> } />
    <Route path="checkout" element={<CheckOut/>}/>
    <Route path='ordersdetail' element={<CustoOrdersDetail/>}/>
  </Route>

  {/* </Route> */}

  {/* Admin Routes */}

  {/* <Route element={<ProtectedRoute/>}  > */}

  <Route path='/admin' element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path='dashboard' element={<Dashboard />} />
    <Route path='allproduct' element={<AllProduct />} />
    <Route path='allorders' element={<AllOrders/>}/>
    <Route path='addproduct' element={<AddProduct />} />
    <Route path='reviews' element={<Reviews />} />
    <Route path='ordersdetail' element={<OrdersDetail/>} />
 </Route>
 {/* </Route> */}
</Routes>
    </>
  )
}

export default App


// import { Route, Routes } from 'react-router-dom'
// import './App.css'

// import AdminLayout from './layout/AdminLayout'
// import CustomerLayout from './layout/CustomerLayout'

// import Home from './pages/CustomerPages/Home'
// import Dashboard from './pages/AdminPages/Dashboard'
// import AllProduct from './pages/AdminPages/AllProduct'
// import AddProduct from './pages/AdminPages/AddProduct'
// import Reviews from './pages/AdminPages/Reviews'
// import OrdersDetail from './pages/AdminPages/OrdersDetail'

// import Contact from './pages/CustomerPages/Contact'
// import AboutUs from './pages/CustomerPages/AboutUs'
// import CustomeReviews from './pages/CustomerPages/CustomeReviews'
// import Login from './pages/CommonPages/Login'
// import Registration from './pages/CommonPages/Registration'
// import Product from './pages/CustomerPages/Product'
// import ProductDetail from './pages/CustomerPages/ProductDetail'
// import Profile from './pages/CustomerPages/Profile'
// import Cart from './pages/CustomerPages/Cart'
// import CheckOut from './pages/CustomerPages/CheckOut'
// import ProtectedRoute from './component/ProtectedRoute'
// import CustomerOrders from './pages/CustomerPages/CustomerOrders'
// import AllOrders from './pages/AdminPages/AllOrders'
// import CustoOrdersDetail from './pages/CustomerPages/CustoOrdersDetail'

// const App = () => {
//   return (
//     <Routes>

//       {/* Public Routes */}
//       <Route path='/' element={<Login />} />
//       <Route path='/registration' element={<Registration />} />

//       {/* Customer Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path='/customer' element={<CustomerLayout />}>
//           <Route index element={<Home />} />
//           <Route path='home' element={<Home />} />
//           <Route path='product' element={<Product />} />
//           <Route path='detail' element={<ProductDetail />} />
//           <Route path='cart' element={<Cart />} />
//           <Route path='checkout' element={<CheckOut />} />
//           <Route path='customerorders' element={<CustomerOrders />} />
//           <Route path='ordersdetail' element={<CustoOrdersDetail />} />
//           <Route path='profile' element={<Profile />} />
//           <Route path='contact' element={<Contact />} />
//           <Route path='aboutus' element={<AboutUs />} />
//           <Route path='customereviews' element={<CustomeReviews />} />
//         </Route>
//       </Route>

//       {/* Admin Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path='/admin' element={<AdminLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path='dashboard' element={<Dashboard />} />
//           <Route path='allproduct' element={<AllProduct />} />
//           <Route path='addproduct' element={<AddProduct />} />
//           <Route path='allorders' element={<AllOrders />} />
//           <Route path='ordersdetail' element={<OrdersDetail />} />
//           <Route path='reviews' element={<Reviews />} />
//         </Route>
//       </Route>

//     </Routes>
//   )
// }

// export default App