// import HeroSection from '../../components/home/HeroSection';
import HeroSection from './HeroSection';
import TrustStrip from './TrustStrip';
import AnswerSection from './AnswerSection';
import ProblemSection from './ProblemSection';
import ProcessPreview from './ProcessPreview';
import ExpertisePreview from './ExpertisePreview';
import EngagementPreview from './EngagementPreview';
import WhyBharyatTeaser from './WhyBharyatTeaser';

// Next sections to add here in order:
// TrustStrip, ProblemSection, AnswerSection, ProcessPreview,
// ExpertisePreview, EngagementPreview, WhyBharyatTeaser,
// IndustriesStrip, GroupStats, FinalCTA

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <AnswerSection />
      <ProcessPreview />
      <ExpertisePreview />
      <EngagementPreview />
      <WhyBharyatTeaser />
    </>
  );
}