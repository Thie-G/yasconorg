import Hero from "@/components/common/Hero";
import About from "@/components/common/About";
import Impact from "@/components/common/Impact";
import NewsSection from "@/components/common/NewsSection";
import Newsletter from "@/components/common/NewsLetter";
import SloganVideo from "@/components/common/VideoSlogan";
export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <SloganVideo />
      <NewsSection />
      <Newsletter />
    </div>
  );
}
