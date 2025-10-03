import "./globals.css";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/ClientWrapper";

import { Toaster } from "react-hot-toast";
import { AppContextProvider } from "@/context/AppContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,1,0,0&icon_names=chat_bubble"
        />
      </head>
      <body>
          <AppContextProvider>
            <Toaster />
            {children}
          <ClientWrapper />
           </AppContextProvider>
     
        <Footer />
      </body>
    </html>
  );
}
