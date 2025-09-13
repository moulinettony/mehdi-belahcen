import React, { useState } from 'react';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectSlider from './components/ProjectSlider';

const App: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // --- HOW TO USE YOUR OWN FORM ENDPOINT ---
  // 1. Go to formspree.io and create a free account and a new form.
  // 2. Formspree will give you a unique URL endpoint.
  // 3. Replace the placeholder URL below with your own endpoint.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setFormState({ name: '', email: '', message: '' }); // Clear form
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus('error');
    }
  };


  return (
    <div className="relative">
      <Starfield />
      <Navbar />
      <main className="relative z-10">
        <section id="home" className="h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left">
            <div className="md:w-2/5 flex justify-center">
              <img 
                src="/Mehdibelahcen.png"
                alt="Profile picture of Mehdi Belahcen" 
                className="rounded-full w-64 h-64 md:w-80 md:h-80 object-top object-cover border-4 border-purple-600 shadow-lg"
              />
            </div>
            <div className="md:w-3/5">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Mehdi Belahcen</h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">Creative Web Developer & UI/UX Enthusiast</p>
              <a
                href="#projects"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300"
              >
                View My Work
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-12">About Me</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="md:w-2/3">
                <p className="mb-4">
                  Hello! I'm Mehdi, a passionate web developer with a knack for creating dynamic, user-friendly web applications. With a strong foundation in modern frontend technologies, I specialize in bringing ideas to life with clean, efficient code.
                </p>
                <p>
                  My goal is to build beautiful and functional websites that provide a great user experience. When I'm not coding, you can find me exploring the latest tech trends or contributing to open-source projects.
                </p>
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-white mb-4">My Skills</h3>
                  <div className="flex flex-wrap gap-4">
                    {['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Supabase', 'Firebase'].map(skill => (
                      <span key={skill} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-md">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-12">My Projects</h2>
            <ProjectSlider />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6 max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Get In Touch</h2>
            <p className="text-gray-400 mb-8">
              I'm currently available for freelance work and open to new opportunities. If you have a project in mind or just want to say hello, feel free to reach out!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={formState.name}
                  onChange={handleInputChange}
                  required 
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={formState.email}
                  onChange={handleInputChange}
                  required 
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows={5} 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                <button 
                  type="submit" 
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 w-full md:w-auto mx-auto disabled:bg-gray-500"
                  disabled={submissionStatus === 'submitting'}
                >
                  {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
             {submissionStatus === 'success' && (
              <p className="mt-4 text-green-400">Thank you! Your message has been sent.</p>
            )}
            {submissionStatus === 'error' && (
              <p className="mt-4 text-red-400">Oops! Something went wrong. Please try again.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;