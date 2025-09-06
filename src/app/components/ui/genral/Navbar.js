"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[170px] bg-cover bg-center z-50 transition-all duration-300 ${
        isScrolled ? "h-[120px] shadow-md" : "h-[170px]"
      }`}
      style={{
        backgroundImage: "url('/NavbarBG.png')",
      }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0"></div>

      {/* Navbar container */}
      <div className="relative z-10 flex justify-between items-center h-full px-6 md:px-12">
        {/* Logo */}
        <motion.div
          className="text-black font-bold text-2xl cursor-pointer flex items-center"
          style={{ position: "relative", top: "-15px", left: "120px" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-12 h-12 mr-2">
            <Image
              src="/logo-placeholder.png" // Add your logo image here
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="hidden sm:inline-block">MyLogo</span>
        </motion.div>

        {/* Desktop Links */}
        <motion.ul
          className="hidden md:flex gap-8 text-black font-medium"
          style={{ position: "relative", top: "-15px", right: "20px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {["Home", "About", "Services", "Contact"].map((item, index) => (
            <motion.li
              key={item}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Link
                href={`/${item.toLowerCase()}`}
                className="hover:text-gray-700 transition-colors relative py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 hover:w-full"></span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-black focus:outline-none z-50"
          onClick={() => setIsOpen(!isOpen)}
          style={{ position: "relative", top: "-15px" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <motion.span
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 180, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              ☰
            </motion.span>
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
              className="fixed inset-0 bg-black/60 md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Items */}
            <motion.ul
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
              className="fixed top-0 right-0 w-3/4 h-full bg-white/95 backdrop-blur-sm text-black flex flex-col gap-8 p-8 pt-24 md:hidden z-40 shadow-2xl"
            >
              {["Home", "About", "Services", "Contact"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-2xl font-medium py-2 block hover:text-gray-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}