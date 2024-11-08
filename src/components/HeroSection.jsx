import { Button } from "antd";
import {Link} from "react-router-dom"

const HeroSection = () => {
    return (
        <div>
            <section className="relative h-[600px] flex items-center justify-center text-center text-white">
            <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/ddtekswva/image/upload/v1730372549/xrm9wxqg4xgwsa7a9u9w.png')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative z-10 space-y-4">
                <h1 className="text-5xl font-bold">Summer Sale</h1>
                <p className="text-xl">50% Off on All Products</p>
                <Link to="/shop"><Button size="lg" className="bg-white text-black hover:bg-gray-200">Shop Now</Button></Link>
            </div>
            </section>
        </div>
    )
}

export default HeroSection