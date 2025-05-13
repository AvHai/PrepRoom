import { BookOpen, Briefcase, Users, PenSquare } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Interview Experiences',
    description: 'Learn from real interview experiences shared by candidates across various companies and roles.'
  },
  {
    icon: Briefcase,
    title: 'Job Opportunities',
    description: 'Discover the latest job openings and internships from top companies and startups.'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Connect with peers, share knowledge, and grow together through shared experiences.'
  },
  {
    icon: PenSquare,
    title: 'Contribute and Grow',
    description: 'Share your own experiences to help others and build your professional network.'
  }
];

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 highlight-border pb-2 mx-auto w-fit">Why CareerConnect?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-accent/10 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 hover:bg-accent/20">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 mb-4 bg-primary/10 rounded-full">
                  <feature.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;