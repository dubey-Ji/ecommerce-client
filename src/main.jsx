import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Applayout from './Applayout.jsx'
import Home from './components/Home.jsx'
import Wishlist from './components/Wishlist.jsx'
import CartPage from './components/cart.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductListingPage from './components/Product.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { Navigate } from 'react-router-dom'
import Logout from './components/Logout.jsx'
import AdminLogout from './components/AdminLogout.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import AddProductPage from './components/AddProduct.jsx'
import ProductListPage from './components/ProductList.jsx'
import CustomerListPage from './components/Customers.jsx'
import OrderListPage from './components/Orders.jsx'
import { UserProvider } from './context/UserContext.jsx'
import AuthPages from './components/AuthPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/CartContext.jsx'
import ProductDetails from './components/ProductDetails.jsx'

const AdminRoute = ({element}) => {
  const isAdmin = localStorage.getItem('isAdmin');
  console.log('isAdmin', isAdmin)
  return isAdmin ? element : <Navigate to="/" />;
}

const UserRoute = ({element}) => {
  const isUser = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');
  return isUser && !isAdmin ? element : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><CartProvider><Applayout /></CartProvider></UserProvider>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/wishlist',
        element: <UserProvider><WishlistProvider><UserRoute element={<Wishlist />} /></WishlistProvider></UserProvider>
      },
      {
        path: '/cart',
        element: <UserProvider><CartProvider><UserRoute element={<CartPage />} /></CartProvider></UserProvider>
      },
      {
        path: '/shop',
        element: <UserProvider><ProductListingPage /></UserProvider>
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/logout',
        element: <UserProvider><UserRoute element={<Logout />} /></UserProvider>
      }
    ]
  },
  {
    path: '/login',
    element: <UserProvider><AuthPages login={true} /></UserProvider>
  },
  {
    path: '/signup',
    element: <UserProvider><AuthPages login={false} /></UserProvider>
  },
  {
    path: '/admin',
    element: <AdminLogin />
  },
  {
    path: '/admin/dashboard',
    element: <AdminProvider><AdminRoute element={<AdminLayout />} /></AdminProvider>,
    children: [
      {
        path: '/admin/dashboard/add-product',
        element: <AdminProvider><AdminRoute element={<AddProductPage />} /></AdminProvider>
      },
      {
        path: '/admin/dashboard/products',
        element: <AdminProvider><AdminRoute element={<ProductListPage />} /></AdminProvider>
      },
      {
        path: '/admin/dashboard/customers',
        element: <AdminProvider><AdminRoute element={<CustomerListPage />} /></AdminProvider>
      },
      {
        path: '/admin/dashboard/orders',
        element: <AdminProvider><AdminRoute element={<OrderListPage />} /></AdminProvider>
      },
    ]
  },
  {
    path: '/admin/logout',
    element: <AdminProvider><AdminRoute element={<AdminLogout />} /></AdminProvider>
  }
])

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>,
)
