import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar/Navbar";
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism,shadesOfPurple } from '@clerk/themes'
// import Footer from "@/components/Footer/Footer";
// import AOSInitiator from "@/lib/aos-initiator";
// import Link from "next/link";
// import CookieConsent from "@/components/CookieConsent/CookieConsent";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500"] });

export const metadata = {
  title: "InstaClip",
  description: "InstaClip generates short-form viral content instantly with AI. No more countless hours editing required.",
};

export default function RootLayout({ children }) {

  return (
    <ClerkProvider   appearance={{
      baseTheme: shadesOfPurple,
    }}>
      <html lang="en">
        
        <body className={poppins.className}>
          {/* <AOSInitiator>
    
        </AOSInitiator> */}
          {children}
          {/* <CookieConsent /> */}

          <ScrollToTopBtn />
        </body>

      </html>
    </ClerkProvider>
  );
}
