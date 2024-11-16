import React, { useState, useEffect } from 'react';
import { Carousel, Rate, InputNumber, Button, Tabs, Card, Row, Col, Input, Rate as AntRate, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axiosInstance from '../interceptors/axios.http';
import { useCart, useWishlist } from '../context/CartContext';

const { TabPane } = Tabs;

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [existingReviews, setExistingReviews] = useState([]);
//   const [similarProducts, setSimilarProducts] = useState([]);
  const { id } = useParams();
  const { userData } = useUser();
  console.log('userData', userData)
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const fetchProduct = async (productId) => {
    try {
        const response = await axiosInstance.request({
            method: 'GET',
            url: `/product/${productId}`
        });
        if (response.data.success) {
            // setCategory(response.data.data.category);
            setProduct(response.data.data);
            // fetchSimilarCategoryProducts(response.data.data.category);
            setCategory(response.data.data.category);
        }
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  const fetchReviews = async(productId) => {
    try {
        const response = await axiosInstance.request({
            method: 'GET',
            url: `/reviews/${productId}`
        })
        console.log('response', response.data.data)
        if (response.data.success) {
            setExistingReviews(response.data.data)
        }
    } catch (error) {
        console.log(error);
    }
  }

  const addReview = async(productId, review, rating, userId) => {
    try {
        console.log('addReview', productId, review, rating, userId)
        const response = await axiosInstance.request({
            method: 'POST',
            url: `/reviews`,
            data: { productId, comment: review, rating, userId }
        })
        if (response.data.success) {
            message.success('Review added successfully')
            setReview('')
            setRating(0)
        } else {
            message.error('Failed to add review')
        }
        console.log('response', response.data)
    } catch (error) {
        console.log(error);
    }
  }

  const fetchSimilarCategoryProducts = async (category) => {
    try {
        const response = await axiosInstance.request({
            method: 'GET',
            url: `/product/category/${category}`
        });
        // if (response.data.success) {
            // setSimilarProducts(response.data.data);
        // }
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  useEffect(() => {
    if (product?.category) {
        fetchSimilarCategoryProducts(product?.category);
    }
  }, [product?.category]);

  useEffect(() => {
    if (product?._id) {
        fetchReviews(product?._id);
    }
  }, [product?._id]);

//   const product = {
//     name: "Premium Wireless Headphones",
//     price: 199.99,
//     rating: 4.5,
//     description: "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and a comfortable over-ear design, these headphones are perfect for music lovers and professionals alike.",
//     features: [
//       "40mm dynamic drivers for exceptional sound quality",
//       "Active noise cancellation",
//       "30-hour battery life",
//       "Bluetooth 5.0 connectivity",
//       "Comfortable memory foam ear cushions"
//     ],
//     images: [
//       "/placeholder.svg?text=Headphones+1",
//       "/placeholder.svg?text=Headphones+2",
//       "/placeholder.svg?text=Headphones+3",
//       "/placeholder.svg?text=Headphones+4"
//     ]
//   };

  const similarProducts = [
    { id: 1, name: "Wireless Earbuds", price: 89.99, rating: 4.2, image: "/placeholder.svg?text=Earbuds" },
    { id: 2, name: "Over-Ear Studio Headphones", price: 249.99, rating: 4.7, image: "/placeholder.svg?text=Studio+Headphones" },
    { id: 3, name: "Sports Bluetooth Headphones", price: 129.99, rating: 4.3, image: "/placeholder.svg?text=Sports+Headphones" },
    { id: 4, name: "Noise-Cancelling Headphones", price: 179.99, rating: 4.6, image: "/placeholder.svg?text=NC+Headphones" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Carousel autoplay className="mb-4">
            {/* {product.images.map((image, index) => ( */}
              <div key={product?._id}>
                <img src={product?.image} alt={`${product?.name}`} className="w-full h-64 md:h-96 object-cover" />
              </div>
            {/* ))} */}
          </Carousel>
        </Col>
        <Col xs={24} md={12}>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{product?.name}</h1>
          <div className="flex items-center mb-4">
            <Rate allowHalf defaultValue={product?.rating} disabled />
            <span className="ml-2 text-gray-600">{product?.rating} stars</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold mb-4">${product?.price.toFixed(2)}</p>
          <p className="mb-4" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Quantity:</span>
            <InputNumber min={1} value={quantity} onChange={setQuantity} />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
            <Button type="primary" icon={<ShoppingCartOutlined />} size="large" block onClick={() => {
                if (userData?.token) {
                    addToCart(product?._id, quantity)
                } else {
                    message.error('Please login to add to cart')
                }
            }}>
              Add to Cart
            </Button>
            <Button icon={<HeartOutlined />} size="large" block onClick={() => {
                if (userData?.token) {
                    addToWishlist(product?._id)
                } else {
                    message.error('Please login to add to wishlist')
                }
            }}>
              Add to Wishlist
            </Button>
          </div>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" className="mt-8">
        <TabPane tab="Description" key="1">
          <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
        </TabPane>
        {/* <TabPane tab="Features" key="2">
          <ul className="list-disc pl-6">
            {product?.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabPane> */}
        <TabPane tab="Reviews" key="3">
            {userData?.token && (
                <div className="mb-4">
                    <Input.TextArea rows={4} className="mb-4" placeholder="Write your review here..." onChange={(e) => setReview(e.target.value)} />
                <Rate allowHalf defaultValue={0} className="mb-4 block" onChange={(value) => setRating(value)} />
                    <Button type="primary" onClick={() => {
                        addReview(product?._id, review, rating, userData?.user._id)
                    }}>Submit</Button>
                </div>
            )}
            {existingReviews.length > 0 && (
                <div>
                    {existingReviews.map((review) => (
    
                            <div>
                                <p>{review.comment}</p>
                                <div className="flex items-center mb-4">
                                <Rate allowHalf defaultValue={review.rating} disabled />
                                <span className="ml-2 text-gray-600">{review.rating}</span>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </TabPane>
      </Tabs>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
        <Row gutter={[16, 16]}>
          {similarProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                cover={<img alt={product.name} src={product.image} className="h-48 object-cover" />}
                hoverable
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <div>
                      <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                      <Rate allowHalf defaultValue={product.rating} disabled />
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetails;