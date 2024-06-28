import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram ,FaLinkedinIn,FaGithub } from "react-icons/fa";
function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center text-center mt-12">
      <div className="footer_links m-3">
        <ul className="flex gap-10">
          <Link>
            <li>Terms Of Usw</li>
          </Link>
          <Link>
            <li>Privacy-Policy</li>
          </Link>
          <Link>
            <li>About</li>
          </Link>
          <Link>
            <li>Blogs</li>
          </Link>
          <Link>
            <li>FAQ</li>
          </Link>
        </ul>
      </div>
      <p  className="w-[60%] m-6"> 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <div className="footer_socials m-2 ">
        <ul className="flex gap-10 ">
        <Link>
            <li><FaFacebookF/></li>
        </Link>
        <Link>
            <li><FaInstagram/></li>
        </Link>
        <Link>
            <li><FaLinkedinIn/></li>
        </Link>
        <Link>
            <li><FaGithub/></li>
        </Link>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
