import Hero from '../components/sections/Hero';
import SubHeroBar from '../components/sections/SubHeroBar';
import Services from '../components/sections/Services';
import CostFlow from '../components/sections/CostFlow';
import Journey from '../components/sections/Journey';
import CodeGuide from '../components/sections/CodeGuide';
import Sectors from '../components/sections/Sectors';
import Stats from '../components/sections/Stats';
import AudiencePanels from '../components/sections/AudiencePanels';
import Pillars from '../components/sections/Pillars';
import Blog from '../components/sections/Blog';
import FAQ from '../components/sections/FAQ';
import RequestForm from '../components/sections/RequestForm';
import Portal from '../components/sections/Portal';

export default function Home() {
  return (
    <>
      <Hero />
      <SubHeroBar />
      <Services />
      <CostFlow />
      <Journey />
      <CodeGuide />
      <Sectors />
      <Stats />
      <AudiencePanels />
      <Pillars />
      <Blog />
      <FAQ />
      <RequestForm />
      <Portal />
    </>
  );
}
