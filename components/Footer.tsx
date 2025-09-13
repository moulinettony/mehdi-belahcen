import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-black/50 py-6 text-center text-gray-400">
      <div className="container mx-auto px-6">
        <p>&copy; {new Date().getFullYear()} Mehdi Belahcen. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;