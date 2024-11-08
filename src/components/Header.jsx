import { Link } from "react-router-dom";
import { Button } from "antd";
import { SearchOutlined, UserOutlined, HeartOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import {useState} from 'react';
import ProfileDropdown from "./ProfileDropdown";
import {useUser} from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCart } from "../context/CartContext";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { userData, logoutUser } = useUser();
    const navigate = useNavigate();
    const { cart } = useCart();
    return (
      <header className="sticky top-0 z-50 w-100vw border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
        <div className="container flex h-16 items-center">
          <Link to="/" className="mx-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Ecommerce</span>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium hidden lg:flex md:block">
            {/* <Link to="/">Home</Link> */}
            <Link to="/shop">Shop</Link>
            {/* <Link to="/pages">Pages</Link> */}
          </nav>

                {/* Mobile Menu - Framer Motion Animation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: '100vw' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100vw' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-white z-50 flex flex-col items-center justify-center"
                    >
                        <button
                            className="absolute top-4 right-4 text-2xl"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <CloseOutlined />
                        </button>
                        <nav className="flex flex-col items-center text-sm font-medium lg:flex md:block">
                            <Link to="/" className="my-[1rem]" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link to="/shop" className="my-[1rem]" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                            {/* <Link to="/pages" className="my-[1rem]">Pages</Link> */}
                        </nav>
                    </motion.div>
                )}
          <div className="flex items-center ml-auto">
                <Button className="border-none shadow-none bg-inherit" onClick={() => {
                  if (userData?.token) {
                    navigate('/wishlist')
                  } else {
                    message.error('Please login to view wishlist')
                  }
                }}>
                    <HeartOutlined />
                </Button>
                <Button className="border-none shadow-none bg-inherit" onClick={() => {
                  if (userData?.token) {
                    navigate('/cart')
                  } else {
                    message.error('Please login to view cart')
                  }
                }}>
                <ShoppingCartOutlined />
                {cart.length > 0 && <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cart.length}</span>}
                </Button>
            <Button className="border-none shadow-none bg-inherit lg:hidden" onClick={() => setIsMenuOpen(true)}>
              <MenuOutlined />
            </Button>
            {userData ? <ProfileDropdown handleLogout={logoutUser} /> : <Link to="/login"><Button className="border-1 shadow-none bg-inherit text-gray-700 border-gray-700 rounded-md px-4 py-2 hover:bg-gray-700 hover:text-white">Login</Button></Link>}
          </div>
        </div>
      </header>
    )
}

export default Header