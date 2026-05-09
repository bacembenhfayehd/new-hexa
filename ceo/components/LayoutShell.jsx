"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login";

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <SideBar />
        {children}
      </div>
    </>
  );
}