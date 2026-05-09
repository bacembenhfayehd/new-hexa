import "./globals.css";
import { AdminContextProvider } from "@/context/AdminContext";
import { Toaster } from "react-hot-toast";
import LayoutShell from "@/components/LayoutShell";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminContextProvider>
          <LayoutShell>{children}</LayoutShell>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "#4aed88",
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: "#ff4b4b",
                },
              },
            }}
          />
        </AdminContextProvider>
      </body>
    </html>
  );
}