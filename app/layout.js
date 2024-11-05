import { Inter, Poppins } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar/Navbar";
import Head from "next/head"
import ScrollToTopBtn from "@/components/ScrollToTopBtn/ScrollToTopBtn";
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
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <body className={poppins.className}>
        {/* <AOSInitiator>
     
        </AOSInitiator> */}
        {children}
        {/* <CookieConsent /> */}

        <ScrollToTopBtn />
      </body>

    </html>
  );
}
