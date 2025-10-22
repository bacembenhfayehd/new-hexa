"use client";
import { IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineFavorite } from "react-icons/md";
import { menulists } from "@/assets/data";
import {
  Container,
  CustomNavLink,
  CustomNavLinkList,
  ProfileCard,
} from "../app/common/Design";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "@/assets/images/common/logo100.png";
import logo2 from "@/assets/images/common/logo200.png";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import ModernSearchOverlay from "./ModernSearchOverlay";
import AboutModal from "./AboutModal";

export const User1 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";

function Navbar() {
  const { cartCount, refreshCart } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const menuRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeMenuOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", closeMenuOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("auth-token");
      const userData = localStorage.getItem("user");

      setIsLoggedIn(!!(token && token !== "undefined"));

      if (userData && userData !== "undefined") {
        try {
          setUser(JSON.parse(userData));
        } catch {
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      refreshCart();
    }
  }, [isLoggedIn, refreshCart]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        credentials: "include",
        body: JSON.stringify({ userId: user.id }),
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = "/";
    }
  };

  const handleAuthAction = (e) => {
    if (isLoggedIn) {
      handleLogout(e);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  const isHomePage = pathname === "/";

  return (
    <>
      <header
        className={
          isHomePage
            ? `header py-1 bg-primary ${isScrolled ? "scrolled" : ""}`
            : `header bg-white shadow-s1 ${isScrolled ? "scrolled" : ""}`
        }
      >
        <Container>
          <nav className="p-4 flex justify-between items-center relative">
            {/* Logo Section */}
            <div className="flex items-center gap-4 md:gap-14 z-50">
              <div className="flex-shrink-0">
                {isHomePage && !isScrolled ? (
                  <Link href="/">
                    <Image
                      src={logo2}
                      alt="LogoImg"
                      width={160}
                      height={50}
                      className="h-6 sm:h-8 w-auto cursor-pointer"
                    />
                  </Link>
                ) : (
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="LogoImg"
                      width={160}
                      height={50}
                      className="h-6 sm:h-8 w-auto cursor-pointer"
                    />
                  </Link>
                )}
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex justify-between gap-8 items-center">
                {menulists
                  .filter(
                    (item) => item.path !== "/auth" && item.path !== "/formule"
                  )
                  .slice(0, 3)
                  .map((list, index) => (
                    <li key={index} className="capitalize list-none">
                      <CustomNavLinkList
                        href={list.path}
                        isActive={pathname === list.path}
                        className={`${
                          isScrolled || !isHomePage
                            ? "text-black"
                            : "text-white"
                        }`}
                      >
                        {list.link}
                      </CustomNavLinkList>
                    </li>
                  ))}
              </div>
            </div>

            {/* Right Side Icons & Actions */}
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8 z-50">
              {/* Desktop Search & Actions */}
              <div className="hidden lg:flex lg:items-center lg:gap-8">
                <ModernSearchOverlay
                  isScrolled={isScrolled}
                  isHomePage={isHomePage}
                />

                <CustomNavLink
                  href="/formule"
                  className={`${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
                >
                  Composer votre formule
                </CustomNavLink>

                <Link
                  href={isLoggedIn ? "#" : "/auth"}
                  onClick={handleAuthAction}
                  className={`${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
                >
                  {isLoggedIn ? "Déconnexion" : "Connexion"}
                </Link>
              </div>

              {/* Cart Icon - Always Visible */}
              <div className="relative">
                <CustomNavLink href="/cart">
                  <FaCartShopping
                    className={`cursor-pointer text-xl sm:text-2xl ${
                      isScrolled || !isHomePage
                        ? "text-black"
                        : "text-white"
                    }`}
                  />
                  {cartCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {cartCount > 99 ? '99+' : cartCount}
                    </div>
                  )}
                </CustomNavLink>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none rounded-md transition-all hover:bg-gray-800 active:scale-95"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* Mobile Menu Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <AiOutlineClose size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <nav className="space-y-1">
              {/* Main Navigation Links */}
              {menulists
                .filter(
                  (item) => item.path !== "/auth" && item.path !== "/formule"
                )
                .map((list) => (
                  <Link
                    key={list.id}
                    href={list.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      pathname === list.path
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {list.link}
                    
                  </Link>
                ))}
                
                

              {/* Divider */}
              <div className="border-t border-gray-200 my-4"></div>

              {/* Special Actions */}
              <Link
                href="/formule"
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === '/formule'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Composer votre formule
              </Link>

              {/* Search Button for Mobile */}
              <div className="px-4 py-3">
                <ModernSearchOverlay
                  isScrolled={true}
                  isHomePage={false}
                  isMobile={true}
                />
              </div>

              {/* Auth Action */}
              <Link
                href={isLoggedIn ? "#" : "/auth"}
                onClick={(e) => {
                  handleAuthAction(e);
                  setIsOpen(false);
                }}
                className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {isLoggedIn ? "Déconnexion" : "Connexion"}
              </Link>
            </nav>
          </div>

          {/* Mobile Menu Footer (Optional User Info) */}
          {isLoggedIn && user && (
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.name || 'Utilisateur'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user.email || ''}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;