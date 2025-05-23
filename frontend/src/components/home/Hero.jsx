// import { ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

// const Hero = () => {
//   return (
//     <div className="relative py-16 md:py-24 overflow-hidden">
//       {/* Gradient background effect */}
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
//         <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
//       </div>

//       <div className="container relative z-10 mx-auto px-4 text-center">
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary animate-fadeIn">
//           CareersConnect
//         </h1>
//         <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
//           Share interview experiences and discover job opportunities to accelerate your career growth
//         </p>
//         <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn" style={{ animationDelay: "0.4s" }}>
//           <Link to="/interviews">
//             <Button size="lg" className="gap-2">
//               Browse Interviews
//               <ArrowRight size={16} />
//             </Button>
//           </Link>
//           <Link to="/opportunities">
//             <Button size="lg" variant="outline" className="gap-2">
//               Find Opportunities
//               <ArrowRight size={16} />
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden bg-grid-pattern">
      {/* Decorative Floating Elements */}
      <div className="absolute w-6 h-6 bg-black opacity-20 rounded-full top-10 left-10 animate-float-fast"></div>
      <div className="absolute w-8 h-8 bg-primary opacity-20 rounded-full bottom-16 right-12 animate-float-fast"></div>
      <div className="absolute w-4 h-4 bg-secondary opacity-20 rounded-full top-24 right-20 animate-float-fast"></div>
      <div className="absolute w-5 h-5 bg-accent opacity-20 rounded-full bottom-24 left-1/3 animate-float-fast"></div>
      <div className="absolute w-7 h-7 bg-destructive opacity-20 rounded-full top-36 left-1/4 animate-float-fast"></div>
      <div className="absolute w-6 h-6 bg-muted opacity-20 rounded-full bottom-10 right-1/4 animate-float-fast"></div>
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-secondary animate-fadeIn">
          CareerConnect
        </h1>
        <p
          className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fadeIn"
          style={{ animationDelay: '0.2s' }}
        >
          Share interview experiences and discover job opportunities to accelerate your career growth
        </p>
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn"
          style={{ animationDelay: '0.4s' }}
        >
          <Link to="/interview">
            <Button size="lg" className="gap-2">
              Browse Interviews
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link to="/opportunities">
            <Button size="lg" variant="outline" className="gap-2">
              Find Opportunities
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 