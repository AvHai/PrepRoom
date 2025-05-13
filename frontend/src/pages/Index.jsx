import Hero from '@/components/home/Hero';
// import FeaturedInterviews from '@/components/home/FeaturedInterviews';
// import FeaturedOpportunities from '@/components/home/FeaturedOpportunities';
import Features from '@/components/home/Features';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <div>
      <Hero />
      <Features />
      {/* <FeaturedInterviews />
      <FeaturedOpportunities /> */}
      <CallToAction />
    </div>
  );
};

export default Index;