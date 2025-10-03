"use client";
import React from "react";
import logo from "@/assets/logo100.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-5 border-b border-gray-300 text-gray-700">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          width={150}
          height={150}
          alt="Logo Haji cosmétiques"
          className=""
        />
      </div>
    </nav>
  );
};

export default Navbar;
