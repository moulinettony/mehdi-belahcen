import React, { useState } from 'react';
import type { Project } from '../types';


const projectsData: Project[] = [
  {
    id: 1,
    title: 'CRM – For Avocat',
    description: 'Developed a full CRM for a law firm using React / Next.js and Supabase, including client, business, and invoice management, Google Apps integration, authentication, and an analytics dashboard.',
    imageUrl: '/project1.png', // Example path
  },
  {
    id: 2,
    title: 'Shopify Theme Customization',
    description: 'Customized Shopify Liquid themes to improve site navigation, implement mega menus, and enhance user experience on e-commerce stores.',
    imageUrl: '/project2.png', // Example path
  },
  {
    id: 3,
    title: 'Web Builders (Dopweb & Bubble)',
    description: 'Built a web app builder with React / Next.js and Supabase, enabling users to create dashboards, manage data, and deploy apps without coding.',
    imageUrl: '/project3.png', // Example path
  },
  {
    id: 4,
    title: 'Landing Pages',
    description: 'Designed and deployed responsive landing pages with modern UI/UX, optimized for conversion and performance using React / Next.js.',
    imageUrl: '/project4.png', // Example path
  },
];

const ProjectSlider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? projectsData.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === projectsData.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto" role="group" aria-roledescription="carousel" aria-label="Projects carousel">
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {projectsData.map((project) => (
                        <div key={project.id} className="w-full flex-shrink-0" role="group" aria-roledescription="slide" aria-label={`Project: ${project.title}`}>
                            <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg overflow-hidden p-8 md:p-12 m-2">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div className="text-center md:text-left order-2 md:order-1">
                                        <h3 className="text-3xl font-bold text-white mb-4">{project.title}</h3>
                                        <p className="text-gray-400 mb-6">{project.description}</p>
                                        <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold inline-block">
                                            View Project &rarr;
                                        </a>
                                    </div>
                                    <div className="flex justify-center order-1 md:order-2">
                                        <img src={project.imageUrl} alt={project.title} className="rounded-lg shadow-lg w-full h-auto object-cover max-h-80" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button onClick={goToPrevious} className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/70 p-3 rounded-full transition-colors" aria-label="Previous project">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                 </svg>
            </button>
            <button onClick={goToNext} className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 bg-gray-800/50 hover:bg-gray-700/70 p-3 rounded-full transition-colors" aria-label="Next project">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default ProjectSlider;