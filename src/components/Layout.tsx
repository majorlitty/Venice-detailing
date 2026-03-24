import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { BookingModal } from './BookingModal';

export const Navbar = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-bg-base/90 backdrop-blur-md border-b border-border-subtle py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Sparkles className="w-8 h-8 text-brand" />
            <span className="font-display text-2xl tracking-wider text-white">VENICE<span className="text-brand">.</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm font-medium text-text-muted hover:text-brand transition-colors">
                {link.name}
              </Link>
            ))}
            <button 
              onClick={onBookClick}
              className="bg-brand text-black px-6 py-2.5 rounded-none font-bold text-sm uppercase tracking-wider hover:bg-brand-hover transition-colors"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-brand transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-bg-surface border-b border-border-subtle"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className="block px-3 py-3 text-base font-medium text-text-main hover:text-brand hover:bg-bg-surface-hover transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onBookClick();
                  }}
                  className="w-full bg-brand text-black px-6 py-3 font-bold text-sm uppercase tracking-wider hover:bg-brand-hover transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-bg-base border-t border-border-subtle pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-brand" />
              <span className="font-display text-xl tracking-wider text-white">VENICE<span className="text-brand">.</span></span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed">
              Venice Detailing takes care of your car so you can reclaim your time and enjoy peace of mind. Premium mobile detailing services.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-text-muted hover:text-brand transition-colors"><Mail className="w-5 h-5" /></a>
              <a href="#" className="text-text-muted hover:text-brand transition-colors"><Phone className="w-5 h-5" /></a>
              <a href="#" className="text-text-muted hover:text-brand transition-colors"><MapPin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/" className="hover:text-brand transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-brand transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li><Link to="/services" className="hover:text-brand transition-colors">Mobile Detailing</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Ceramic Coating</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Paint Correction</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Interior Deep Clean</Link></li>
            </ul>
          </div>

          {/* Contact / Hours */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Hours & Contact</h4>
            <ul className="space-y-4 text-sm text-text-muted">
              <li className="flex justify-between">
                <span>Mon - Fri:</span>
                <span className="text-white">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-white">Closed</span>
              </li>
              <li className="pt-4 mt-4 border-t border-border-subtle">
                <a href="tel:+1234567890" className="text-xl font-display text-brand hover:text-brand-hover transition-colors">
                  (555) 123-4567
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border-subtle pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
          <p>&copy; {new Date().getFullYear()} Venice Detailing. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base font-sans selection:bg-brand selection:text-black flex flex-col">
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <main className="flex-grow">
        <Outlet context={{ onBookClick: () => setIsBookingOpen(true) }} />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};
