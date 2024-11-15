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
    element: <UserProvider><CartProvider><WishlistProvider><Applayout /></WishlistProvider></CartProvider></UserProvider>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/wishlist',
        element: <UserRoute element={<Wishlist />} />
      },
      {
        path: '/cart',
        element: <UserRoute element={<CartPage />} />
      },
      {
        path: '/shop',
        element: <ProductListingPage />
      },
      {
        path: '/product/:id',
        element: <ProductDetails />
      },
      {
        path: '/logout',
        element: <UserRoute element={<Logout />} />
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
        element: <AdminRoute element={<AddProductPage />} />
      },
      {
        path: '/admin/dashboard/products',
        element: <AdminRoute element={<ProductListPage />} />
      },
      {
        path: '/admin/dashboard/customers',
        element: <AdminRoute element={<CustomerListPage />} />
      },
      {
        path: '/admin/dashboard/orders',
        element: <AdminRoute element={<OrderListPage />} />
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
