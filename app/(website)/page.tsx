import Hero from "@/components/common/Hero";
import About from "@/components/common/About";
import OurWork from "@/components/common/OurWork";
import Impact from "@/components/common/Impact";
import NewsSection from "@/components/common/NewsSection";
import Newsletter from "@/components/common/NewsLetter";
import MissionStatement from "@/components/common/MissionStatement";
import KeyObjectives from "@/components/common/keyObjectives";
import SloganVideo from "@/components/common/VideoSlogan";
import NationalStatistics from "@/components/common/NationalStatistics";
import OurStory from "@/components/common/OurStory";
export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <OurStory />
      <OurWork />
      <MissionStatement />
      <KeyObjectives />
      <SloganVideo />
      <NationalStatistics />
      <NewsSection />
      <Newsletter />
    </div>
  );
}
