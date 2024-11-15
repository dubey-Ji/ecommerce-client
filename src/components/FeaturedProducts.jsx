import { Button, Skeleton, message } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useCart, useWishlist } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../interceptors/axios.http";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { addToCart, cart, removeFromCart } = useCart();
  console.log('cart', cart);
  const { addToWishlist, wishlist, removeFromWishlist } = useWishlist();
  const { userData } = useUser();
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await axiosInstance.request({
      method: 'GET',
      url: '/product'
    });
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
            {products.length === 0 ? 
            <>
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Skeleton.Image active className="!w-full !h-48" />
                  <div className="p-4">
                    <Skeleton.Input active className="!w-3/4 !mb-2" size="small" />
                    {/* <Skeleton.Input active className="!w-1/4 !mb-4" size="small" /> */}
                    <div className="flex justify-between items-center gap-2">
                      <Skeleton.Button active className="!w-full" />
                      <Skeleton.Button active className="!w-full" />
                    </div>
                  </div>
                </div>
              ))}
            </> : products.map((product) => (
                <div key={product.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-gray-600">$ {product.price}</p>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center p-4">
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
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts;