import FeaturedProducts from "./FeaturedProducts";
import FeaturedCategories from "./FeaturedCategories";
import HeroSection from "./HeroSection";
import BannerSection from "./BannerSection";
import { WishlistProvider } from "../context/CartContext";
import { CartProvider } from "../context/CartContext";


const Home = () => {
    return (
        <>
            <HeroSection />
            <FeaturedCategories />
            <WishlistProvider>
                <CartProvider>
                    <FeaturedProducts />
                </CartProvider>
            </WishlistProvider>
            <BannerSection />
        </>
    )
}

export default Home;