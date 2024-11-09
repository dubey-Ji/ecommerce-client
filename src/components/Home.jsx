import FeaturedProducts from "./FeaturedProducts";
import FeaturedCategories from "./FeaturedCategories";
import HeroSection from "./HeroSection";
import BannerSection from "./BannerSection";
import { WishlistProvider } from "../context/CartContext";


const Home = () => {
    return (
        <>
            <HeroSection />
            <FeaturedCategories />
            <WishlistProvider>
                <FeaturedProducts />
            </WishlistProvider>
            <BannerSection />
        </>
    )
}

export default Home;