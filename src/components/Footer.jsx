import { Link } from "react-router-dom";
import { Button, Input } from "antd";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto my-0 px-[0.75rem]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/shop" className="text-gray-400 hover:text-white">Shop</Link></li>
              {/* <li><Link to="/about" className="text-gray-400 hover:text-white">About</Link></li> */}
              {/* <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="https://github.com/dubey-Ji" className="text-gray-400 hover:text-white" target="_blank">Github</Link>
              <Link to="https://www.linkedin.com/in/ashutosh-dubey-bk/" className="text-gray-400 hover:text-white" target="_blank">LinkedIn</Link>
              <Link to="https://x.com/_ashutoshdubey" className="text-gray-400 hover:text-white" target="_blank">Twitter</Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="flex">
              <Input type="email" placeholder="Your email" className="rounded-r-none" />
              <Button type="submit" className="rounded-l-none bg-gray-800 text-white">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Ecommerce | Ashutosh Dubey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;