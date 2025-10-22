import "./globals.css";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
         <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
          <AppContextProvider>
            <Toaster />
            <main>{children}</main>
          <ClientWrapper />
           </AppContextProvider>
     
        <Footer />
      </body>
    </html>
  );
}
