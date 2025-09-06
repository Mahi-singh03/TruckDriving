"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneNumbers = [
    { label: 'Official Contact', number: '+91 62804-05570' },
    { label: 'Emergency', number: '+91 78892-87161' }
  ];

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'About', href: '/about' },
    { 
      name: 'Verification', 
      href: '#', 
      dropdown: [
        { name: 'Staff', href: '/staff' },
        { name: 'Student', href: '/student' }
      ] 
    },
  ];

  const socialLinks = [
    { 
      icon: <FaInstagram className="h-6 w-6" />, 
      href: 'https://www.instagram.com/colorsense_salon/', 
      name: 'Instagram' 
    },
    { 
      icon: <FaWhatsapp className="h-6 w-6" />, 
      href: 'https://wa.me/7889287161?text=Hi%2C%20I%20am%20interested%20in%20your%20services%20at%20Colour%20Sense%20Salon.%20Could%20you%20please%20help%20me%20with%20more%20details%3F',
      name: 'WhatsApp' 
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "h-[100px] md:h-[120px] shadow-md" 
            : "h-[140px] md:h-[170px]"
        }`}
        style={{
          background: "url('/NavbarBG.png') no-repeat left center/cover",
        }}
      >
        {/* Navbar container */}
        <div className="flex  items-center h-full px-4 md:px-12">
          {/* Logo */}
          <motion.div
            className="text-black font-bold text-2xl cursor-pointer flex items-center relative -top-4 pl-26"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-12 h-12 mr-3">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden sm:inline-block text-lg md:text-xl">Colour Sense</span>
          </motion.div>

          {/* Desktop Links */}
          <motion.ul
            className="hidden lg:flex gap-8 text-black font-medium relative -top-4 mr-5 pl-[10%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {navLinks.map((item) => (
              <motion.li
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="relative"
              >
                {item.dropdown ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsVerificationOpen(true)}
                    onMouseLeave={() => setIsVerificationOpen(false)}
                  >
                    <button className="flex items-center hover:text-gray-300 transition-colors relative">
                      {item.name}
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    </button>
                    
                    <AnimatePresence>
                      {isVerificationOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 bg-white/95 rounded-md shadow-lg py-1 z-50 border border-gray-200"
                          onMouseEnter={() => setIsVerificationOpen(true)}
                          onMouseLeave={() => setIsVerificationOpen(false)}
                        >
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="block px-4 py-2 text-black hover:bg-gray-100"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-gray-300 transition-colors relative py-1"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 hover:w-full"></span>
                  </Link>
                )}
              </motion.li>
            ))}
          </motion.ul>

          {/* Desktop Social Icons and Phone */}
          <div className="hidden lg:flex items-center gap-4 relative -top-4 pl-[15%]">
            {/* Phone Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsPhoneOpen(!isPhoneOpen)}
                className="text-black hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoIosCall className="h-6 w-6" />
              </motion.button>

              <AnimatePresence>
                {isPhoneOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-56 bg-white/95 rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <div className="px-4 py-2 font-medium text-black border-b border-gray-200">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block px-4 py-2 text-black hover:bg-gray-100"
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-blue-600">{phone.number}</div>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Social Icons */}
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden text-black focus:outline-none z-50 relative -top-4 pl-[40%]"
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 lg:hidden z-40"
                onClick={toggleMenu}
              />
              
              {/* Menu Items */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 20, stiffness: 200 }}
                className="fixed top-0 right-0 w-full max-w-sm h-full bg-white/95 backdrop-blur-sm text-black flex flex-col z-40 shadow-2xl"
              >
               
                
                <div className="flex-1 overflow-y-auto pt-16 pb-24 px-6">
                  {navLinks.map((item) => (
                    <div key={item.name} className="mb-4">
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => setIsVerificationOpen(!isVerificationOpen)}
                            className="flex justify-between items-center w-full text-2xl font-medium py-4 border-b border-gray-200"
                          >
                            {item.name}
                            <ChevronDownIcon 
                              className={`h-6 w-6 transition-transform ${isVerificationOpen ? 'rotate-180' : ''}`} 
                            />
                          </button>
                          
                          <AnimatePresence>
                            {isVerificationOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pl-4"
                              >
                                {item.dropdown.map((dropdownItem) => (
                                  <Link
                                    key={dropdownItem.name}
                                    href={dropdownItem.href}
                                    className="block text-xl py-3 text-gray-700 border-b border-gray-200"
                                    onClick={toggleMenu}
                                  >
                                    {dropdownItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-2xl font-medium py-4 border-b border-gray-200"
                          onClick={toggleMenu}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                  
                  {/* Phone Numbers in Mobile Menu */}
                  <div className="mt-8">
                    <div className="text-xl font-medium text-gray-700 mb-3">
                      Contact Numbers
                    </div>
                    {phoneNumbers.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.number.replace(/\D/g, '')}`}
                        className="block py-2 text-gray-700"
                      >
                        <div className="font-medium">{phone.label}</div>
                        <div className="text-blue-600">{phone.number}</div>
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Mobile Social Bar - Always visible on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 z-40 flex justify-around items-center">
        <a
          href={`tel:${phoneNumbers[0].number.replace(/\D/g, '')}`}
          className="flex flex-col items-center text-black"
        >
          <IoIosCall className="h-7 w-7" />
          <span className="text-xs mt-1">Call</span>
        </a>
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-black"
          >
            {social.icon}
            <span className="text-xs mt-1">{social.name}</span>
          </a>
        ))}
      </div>
      
      {/* Padding to account for fixed navbar and social bar on mobile */}
      <div className={`pt-[140px] pb-20 lg:pt-0 lg:pb-0 ${isScrolled ? 'pt-[100px] lg:pt-[120px]' : 'pt-[140px] lg:pt-[170px]'}`}></div>
    </>
  );
}