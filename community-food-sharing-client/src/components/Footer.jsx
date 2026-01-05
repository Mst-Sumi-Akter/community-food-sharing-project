import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import Logo from '../assets/1logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#ff8a0c] via-[#ff9e2b] to-[#07a0e3] text-white pt-12 rounded-2xl shadow-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

        {/* Logo & About */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src={Logo} alt="Logo" className="h-14 w-auto mb-3 rounded-xl shadow-lg" />
          <h2 className="text-xl font-bold mb-2">Community Food Sharing</h2>
          <p className="text-gray-100 text-sm">
            Connecting donors and communities to reduce food waste and feed those in need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/all-foods" className="hover:text-yellow-300 transition">All Foods</Link></li>
            <li><Link to="/add-food" className="hover:text-yellow-300 transition">Add Food</Link></li>
            <li><Link to="/profile" className="hover:text-yellow-300 transition">Profile</Link></li>
            <li><Link to="/login" className="hover:text-yellow-300 transition">Login</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-300 transition">Learning Blog</Link></li>
            <li><Link to="/" className="hover:text-yellow-300 transition">Guides</Link></li>
            <li><Link to="/" className="hover:text-yellow-300 transition">Poly Tips</Link></li>
            <li><Link to="/resources" className="hover:text-yellow-300 transition">Resources</Link></li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-3 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition">
              <Instagram size={20} />
            </a>
          </div>
          <a href="mailto:support@communityfood.com" className="flex items-center justify-center md:justify-start text-gray-100 hover:text-yellow-300 transition">
            <Mail size={16} className="mr-2" /> support@communityfood.com
          </a>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/30 pt-4 text-center text-gray-200 text-sm rounded-b-3xl">
        © {currentYear} Community Food Sharing. All Rights Reserved.
        <div className="mt-2 space-x-4">
          <Link to="/" className="hover:text-yellow-300 transition">Privacy Policy</Link>
          <Link to="/" className="hover:text-yellow-300 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


