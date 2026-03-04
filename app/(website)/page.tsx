import Hero from "@/components/common/Hero";
import About from "@/components/common/About";
import OurWork from "@/components/common/OurWork";
import Impact from "@/components/common/Impact";
import NewsSection from "@/components/common/NewsSection";
import Newsletter from "@/components/common/NewsLetter";
import MissionStatement from "@/components/common/MissionStatement";
import KeyObjectives from "@/components/common/keyObjectives";
import SloganVideo from "@/components/common/VideoSlogan";
export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <OurWork />
      <MissionStatement />
      <KeyObjectives />
      <SloganVideo />
      <NewsSection />
      <Newsletter />
    </div>
  );
}
