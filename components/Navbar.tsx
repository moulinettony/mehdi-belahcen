import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const navLinks = ['Home', 'About', 'Projects', 'Contact'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu on link click
  };
  
  const Logo = () => (
    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mehdi Belahcen Logo">
        <path d="M50 0L96.6506 25V75L50 100L3.34937 75V25L50 0Z" fill="#8B5CF6"/>
        <path d="M50 12.5L84.8253 31.25V68.75L50 87.5L15.1747 68.75V31.25L50 12.5Z" stroke="white" strokeWidth="5"/>
        <text x="50" y="62" textAnchor="middle" fontFamily="sans-serif" fontSize="30" fill="white" fontWeight="bold">MB</text>
    </svg>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <nav className="py-4 flex justify-between items-center">
          {/* Nav links for desktop on the left */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => handleScroll(e, link.toLowerCase())}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile hamburger button on the left */}
          <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open menu" aria-expanded={isMenuOpen}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
              </button>
          </div>

          {/* Logo on the right */}
          <a href="#home" onClick={(e) => handleScroll(e, 'home')}>
            <Logo />
          </a>
        </nav>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
            <ul className="flex flex-col items-start py-2">
              {navLinks.map((link) => (
                <li key={link} className="py-2 w-full">
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleScroll(e, link.toLowerCase())}
                    className="text-gray-300 hover:text-white text-lg transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;