import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../interceptors/axios.http";
import { Skeleton } from "antd";

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
      const fetchCategories = async () => {
    try {
        const response = await axiosInstance.request({
            method: 'GET',
            url: '/category'
        });
        setCategories(response.data.data.slice(0, 3))
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

    return (
        <section className="py-16 container my-0 mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.length === 0 ? 
                <>
                    <Skeleton.Image active className="!w-full !h-64 rounded-lg" />
                    <Skeleton.Image active className="!w-full !h-64 rounded-lg" />
                    <Skeleton.Image active className="!w-full !h-64 rounded-lg" />
                </> : categories.map((category) => (
                    <div key={category._id} className="relative h-64 group overflow-hidden rounded-lg cursor-pointer" onClick={() => navigate(`/shop`, {state: {categoryId: category._id}})}>
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeaturedCategories