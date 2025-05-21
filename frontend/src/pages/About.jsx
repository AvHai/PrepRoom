
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">About CareerConnect</h1>
        <p className="text-xl text-muted-foreground">
          Empowering students and early professionals with real interview experiences and opportunities
        </p>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4 highlight-border pb-2">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-4">
            CareerConnect was created with a simple mission: to demystify the interview process and help
            students and early career professionals find meaningful opportunities more easily.
          </p>
          <p className="text-lg leading-relaxed">
            By building a community where people can share real interview experiences and discover curated job postings,
            we aim to level the playing field and help talented individuals showcase their skills to the world.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 highlight-border pb-2">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="card-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Interview Experiences</h3>
                <p className="text-muted-foreground">
                  Browse through hundreds of detailed interview experiences across companies and roles.
                  Learn about the questions asked, preparation strategies, and insider tips.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Job Opportunities</h3>
                <p className="text-muted-foreground">
                  Discover internships and full-time positions tailored for students and early professionals.
                  Updated regularly with verified openings from top companies and startups.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with peers who have similar career interests. Share knowledge, ask questions,
                  and learn from each other's experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="card-glow">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">Career Resources</h3>
                <p className="text-muted-foreground">
                  Access curated resources to help you prepare for interviews, build your resume,
                  and navigate the early stages of your career.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* <section>
          <h2 className="text-2xl font-semibold mb-6 highlight-border pb-2">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>RJ</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">Raj Joshi</h3>
              <p className="text-primary">Founder</p>
              <p className="text-sm text-muted-foreground mt-2">
                Former Campus Recruiter, passionate about connecting talent with opportunity.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">Sneha Patel</h3>
              <p className="text-primary">Product Lead</p>
              <p className="text-sm text-muted-foreground mt-2">
                UI/UX expert with a background in career development counseling.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">Arjun Kumar</h3>
              <p className="text-primary">Community Manager</p>
              <p className="text-sm text-muted-foreground mt-2">
                Former tech interviewer who believes in the power of shared knowledge.
              </p>
            </div>
          </div>
        </section> */}
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 highlight-border pb-2">Join Our Community</h2>
          <p className="text-lg leading-relaxed">
            CareerConnect is more than just a platform—it's a community. Whether you're preparing for your first interview,
            looking to switch careers, or wanting to share your experiences to help others, we welcome you to be part of our journey.
          </p>
          <p className="text-lg leading-relaxed mt-4">
            Sign up today to contribute your stories, discover opportunities, and connect with like-minded professionals.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;