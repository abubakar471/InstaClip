import FAQ from "@/components/HomePage/FAQ/FAQ";
import Footer from "@/components/HomePage/Footer/Footer";
import FooterBottom from "@/components/HomePage/FooterBottom/FooterBottom";
import Hero from "@/components/HomePage/Hero/Hero";
import JoinDiscordCommunity from "@/components/HomePage/JoinDiscordCommunity/JoinDiscordCommunity";
import Navbar from "@/components/HomePage/Navbar/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FAQ />
      <JoinDiscordCommunity />
      <Footer />
      <FooterBottom />
    </main>
  );
}
