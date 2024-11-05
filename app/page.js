import Footer from "@/components/HomePage/Footer/Footer";
import FooterBottom from "@/components/HomePage/FooterBottom/FooterBottom";
import Hero from "@/components/HomePage/Hero/Hero";
import Navbar from "@/components/HomePage/Navbar/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Footer />
      <FooterBottom />
    </main>
  );
}
