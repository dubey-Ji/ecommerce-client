import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
    const navigate = useNavigate();
  return (
    <section className="py-16">
      <div className="relative h-96 rounded-lg overflow-hidden">
        <img src="https://res.cloudinary.com/ddtekswva/image/upload/v1730372467/wzgiqfpkxvpaijacuffp.png" alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">New Arrivals</h2>
            <p className="text-xl mb-6">Check out our latest collection</p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200" onClick={() => navigate('/shop')}>Shop Now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerSection;