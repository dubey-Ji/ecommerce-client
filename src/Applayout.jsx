import Header from './components/Header'
import { Outlet, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';

const Applayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Applayout