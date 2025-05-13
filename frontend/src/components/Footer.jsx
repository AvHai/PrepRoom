import { FaTwitter, FaLinkedin,FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md mt-16">
      <div className="text-center">
        <h4 className="font-medium text-lg pu-4 mb-4 highlight-border pb-2">Connect</h4>
        <ul className="flex justify-center space-x-6 items-center">
          <li>
            <a
              href="#"
              className="text-2xl text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-2xl text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="#"
              className="text-2xl text-muted-foreground hover:text-primary transition-colors"
              aria-label="Contact"
            >
              <FaInstagram />
            </a>
          </li>
        </ul>
        <div className="border-t border-border mt-8 pt-6 pb-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} CareerConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


