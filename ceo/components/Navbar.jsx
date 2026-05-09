"use client";
import React from "react";
import logo from "@/assets/logo100.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-5 border-b border-gray-300 text-gray-700">
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          width={150}
          height={150}
          alt="Logo Hexagrow"
        />
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
      >
        <LogOut size={18} />
        <span className="hidden md:inline">Déconnexion</span>
      </button>
    </nav>
  );
};

export default Navbar;