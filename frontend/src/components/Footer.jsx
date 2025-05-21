import { FaTwitter, FaLinkedin,FaInstagram } from "react-icons/fa";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="border-t border-border bg-background/80 backdrop-blur-md mt-16">
//       <div className="text-center">
//         <h4 className="font-medium text-lg pu-4 mb-4 highlight-border pb-2">Connect</h4>
//         <ul className="flex justify-center space-x-6 items-center">
//           <li>
//             <a
//               href="#"
//               className="text-2xl text-muted-foreground hover:text-primary transition-colors"
//               aria-label="Twitter"
//             >
//               <FaTwitter />
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="text-2xl text-muted-foreground hover:text-primary transition-colors"
//               aria-label="LinkedIn"
//             >
//               <FaLinkedin />
//             </a>
//           </li>
//           <li>
//             <a
//               href="#"
//               className="text-2xl text-muted-foreground hover:text-primary transition-colors"
//               aria-label="Contact"
//             >
//               <FaInstagram />
//             </a>
//           </li>
//         </ul>
//         <div className="border-t border-border mt-8 pt-6 pb-6 text-center text-sm text-muted-foreground">
//           <p>&copy; {currentYear} CareerConnect. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { NavLink } from "react-router-dom"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              CareerConnect
            </h3>
            <p className="text-muted-foreground text-sm max-w-xs">
              A platform for students and early professionals to share interview
              experiences and discover job opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-2 highlight-border pb-0.5 ">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/interviews"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Interview Blogs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/opportunities"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Opportunities
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-2 highlight-border pb-0.5">
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} CareerConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
