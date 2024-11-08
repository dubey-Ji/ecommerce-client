import { Button } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useCart, useWishlist } from "../context/CartContext";
import { message } from "antd";
import { useNavigate, Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cart, removeFromCart } = useCart();
  console.log('cart', cart);
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();
  const { userData } = useUser();
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/product");
    setProducts(response.data.data.slice(response.data.data.length - 4, response.data.data.length));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto my-0">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <Link to={`/product/${product._id}`}><h3 className="font-semibold">{product.name}</h3></Link>
                <p className="text-gray-600">$ {product.price}</p>
                <div className="flex justify-between items-center">
                  <Button icon={wishlist.includes(product._id) ? <HeartFilled /> : <HeartOutlined />} className="w-full mt-4 bg-gray-100 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-200 mr-2" onClick={() => {
                    if (userData?.token && !wishlist.includes(product._id)) {
                      addToWishlist(product._id)
                    } else if (userData?.token && wishlist.includes(product._id)) {
                      removeFromWishlist(product._id)
                    } else {
                      message.error('Please login to add to wishlist')
                    }
                  }}></Button>
                  <Button className="w-full mt-4" onClick={() => {
                    if (userData?.token) {
                      addToCart(product._id)
                    } else if (userData?.token && cart.includes(product._id)) {
                      removeFromCart(product._id)
                    } else {
                      message.error('Please login to add to cart')
                    }
                  }}>Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts;