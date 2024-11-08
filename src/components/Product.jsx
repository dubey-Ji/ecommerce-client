import React, { useState, useEffect } from 'react';
import { Layout, Card, Rate, Checkbox, Button, Typography, Space, Tag, Drawer } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const ProductListingPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/api/product");
    console.log('response in fetchProducts', response.data.data)
    setProducts(response.data.data)
  }
  const fetchCategories = async () => {
    const response = await axios.get("http://localhost:8000/api/category");
    setCategories(response.data.data)
  }
  const fetchProductByCategory = async (categoryId) => {
    if (categoryId) {
        console.log('Fetching products for category:', categoryId);
      try {
        const response = await axios.get(`http://localhost:8000/api/product/category/${categoryId}`);
        console.log('response', response.data.data)
        setProducts(response.data.data);  // Assuming the data format is correct
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    } else {
      console.log('No category, fetching all products')
      fetchProducts();
    }
  };
  const [selectedFilters, setSelectedFilters] = useState({
  });
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    // Fetch categories initially
    fetchCategories();
  }, []);

  useEffect(() => {
  const initializeData = async () => {
    console.log('Fetching categories');
    await fetchCategories();
    
    if (!location.state?.categoryId && !selectedFilters.id) {
      console.log('No category selected, fetching all products');
      await fetchProducts();
    } else {
      console.log('Category selected, skipping fetchProducts');
    }
  };
    
    initializeData();

    // Move resize handler setup to a separate useEffect
  }, [selectedFilters.id, location.state?.categoryId]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Check if categoryId is available in location.state and set it to selectedFilters
    if (location.state?.categoryId) {
      console.log('Setting selectedFilters from location.state.categoryId:', location.state.categoryId);
      setSelectedFilters({ id: location.state.categoryId });
      setIsLoading(false); // Loading complete
    } else {
      setIsLoading(false); // No categoryId, proceed with fetching products
    }
  }, [location.state?.categoryId]);

  useEffect(() => {
    // Only execute if loading is false, meaning selectedFilters has been set
    if (!isLoading) {
      if (selectedFilters.id) {
        console.log('Fetching products by category:', selectedFilters.id);
        fetchProductByCategory(selectedFilters.id);
      } else {
        console.log('Fetching all products');
        fetchProducts();
      }
    }
  }, [selectedFilters.id, isLoading]);

  const FilterContent = () => (
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
      <div>
        <Title level={5}>Category</Title>
        <Checkbox.Group value={selectedFilters.id} onChange={(values) => {
          console.log('values', values)
          console.log('selectedFilters', selectedFilters)
          setSelectedFilters(prev => ({ id: values.length > 0 ? values[0] : '' }));
        }}>
          <Space direction="vertical">
            {categories.map(category => (
              <Checkbox key={category._id} value={category._id}>{category.name}</Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </div>
    </Space>
  );

  return (
    <Layout>
        {
            isMobile && (
                <Header className="bg-white border-b p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Button 
                            icon={<FilterOutlined />} 
                            onClick={() => setDrawerVisible(true)}
                            className="flex items-center bg-gray-100 text-gray-700 rounded-md px-4 py-2"
                        >
                            Filter
                        </Button>
                    </div>
                </Header>
            )
        }
      <Layout>
        {!isMobile && (
          <Sider width={250} theme="light" className="p-4">
            <FilterContent />
          </Sider>
        )}
        <Content className="p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {
              products.length === 0 ? (
                <div>No products found</div>
              ) : (
                console.log('products', products),
                products.map(product => (
              <Card
                key={product.id}
                cover={<img alt={product.name} src={product.image} className="p-4" />}
                // actions={[<Button icon={<HeartOutlined />} key="favorite" />]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Space direction="vertical" size="small">
                      {product.rating && <Rate disabled defaultValue={product.rating} />}
                      {product.reviews && <Text type="secondary">{`(${product.reviews} people rated)`}</Text>}
                      <Space>
                        {product.originalPrice && (
                          <Text delete type="secondary">${product.originalPrice.toFixed(2)}</Text>
                        )}
                        <Text strong>${product.price.toFixed(2)}</Text>
                      </Space>
                      {/* <Text type="secondary">{`${product.colors} colors`}</Text> */}
                      {/* {product.verified && <Tag color="success">Verified</Tag>} */}
                      {/* {product.stockLimited && <Tag color="warning">Stock limited</Tag>} */}
                      {/* {product.dealEnds && <Tag color="processing">{product.dealEnds}</Tag>} */}
                      {/* {product.additionalInfo && <Text type="secondary">{product.additionalInfo}</Text>} */}
                    </Space>
                  }
                />
                  </Card>
                ))
              )
            }
          </div>
        </Content>
      </Layout>
      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        <FilterContent />
      </Drawer>
    </Layout>
  );
};

export default ProductListingPage;