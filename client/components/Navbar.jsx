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


export const User1 = "https://cdn-icons-png.flaticon.com/128/236/236832.png";

function Navbar() {
  const { cartCount, refreshCart } = useAppContext()
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

    // Charger au montage
    loadUser();

    // 🔄 Recharger quand "storage" est dispatché
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
      // Appel API logout pour supprimer le refreshToken du serveur et du cookie
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
        credentials: "include", // Important pour envoyer les cookies
        body: JSON.stringify({ userId: user.id }),
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      // Nettoyer seulement le localStorage (les cookies sont gérés par le serveur)
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

if (!mounted) {
  // Retourne un placeholder ou rien tant que le client n’est pas prêt
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
          <nav className="p-4  flex justify-between items-center relative">
            <div className="flex items-center gap-14">
              <div>
                {isHomePage && !isScrolled ? (
                  <Link href="/">
                    <Image
                      src={logo2}
                      alt="LogoImg"
                      width={160}
                      height={50}
                      className="h-8 cursor-pointer"
                    />
                  </Link>
                ) : (
                  <Link href="/">
                    <Image
                      src={logo}
                      alt="LogoImg"
                      width={160}
                      height={50}
                      className="h-8 cursor-pointer"
                    />
                  </Link>
                )}
              </div>

              <div className="lg:flex justify-between gap-8 items-center hidden ">
                {menulists.map((list, index) => (
                  <li key={index} className="capitalize list-none text-white">
                    <CustomNavLinkList
                      href={list.path}
                      isActive={pathname === list.path}
                      className={`${
                        isScrolled || !isHomePage ? "text-black" : "text-white"
                      }`}
                    >
                      {list.link}
                    </CustomNavLinkList>
                  </li>
                ))}
              </div>
            </div>
            

            <div className="flex items-center gap-8 icons">
              <div className="hidden lg:flex lg:items-center lg:gap-8 ">
                <ModernSearchOverlay isScrolled={isScrolled} isHomePage={isHomePage}/>

                <CustomNavLink
                  href="/formule"
                  className={`${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
                >
                  Composer sa formule
                </CustomNavLink>

                <Link
          href={isLoggedIn ? "#" : "/auth"}
          onClick={handleAuthAction}
           className={`${
                    isScrolled || !isHomePage ? "text-black" : "text-white"
                  }`}
        >
          {isLoggedIn
            ? "Déconnexion"
            : "Connexion"}
        </Link>
              </div>
              <div className="relative">
                <CustomNavLink href="/cart">
                  <FaCartShopping
                    className={` cursor-pointer ${
                      isScrolled || !isHomePage
                        ? "text-black text-2xl"
                        : "text-white text-2xl"
                    }`}
                  />
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </div>
                </CustomNavLink>
              </div>
              <div
                className={`icon flex items-center justify-center gap-6 ${
                  isScrolled || !isHomePage ? "text-primary" : "text-white"
                }`}
              >
                <button
                  onClick={toggleMenu}
                  className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white focus:outline-none"
                >
                  {isOpen ? (
                    <AiOutlineClose size={24} />
                  ) : (
                    <AiOutlineMenu size={24} />
                  )}
                </button>
              </div>
            </div>

            {/* Responsive Menu if below 768px */}
            <div
              ref={menuRef}
              className={`lg:flex lg:items-center lg:w-auto w-full p-5 absolute right-0 top-full menu-container ${
                isOpen ? "open" : "closed"
              }`}
            >
              {menulists.map((list) => (
                <Link href={list.path}><li
                  href={list.path}
                  key={list.id}
                  className="uppercase list-none"
                >
                  <span className="text-white">{list.link}</span>
                </li></Link>
              ))}
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Navbar;
