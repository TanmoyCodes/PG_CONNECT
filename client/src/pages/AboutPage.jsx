import React, { useState } from 'react';
import { Briefcase, Users, Target, Eye, Heart, Send, Building2, Search, Smile, Linkedin, X } from 'lucide-react';

// --- Helper Components ---

// Card component for consistent styling
const InfoCard = ({ icon, title, children, className }) => (
  <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
    <div className="flex items-center justify-center bg-blue-100 rounded-full w-12 h-12 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

// Updated Team Member Card Component
const TeamMemberCard = ({ image, name, role, linkedinUrl }) => (
    <a 
        href={linkedinUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group block bg-white p-6 rounded-2xl shadow-lg hover:shadow-blue-200 transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-transparent hover:border-blue-500"
    >
        <div className="text-center">
            <img 
                src={image} 
                alt={`Photo of ${name}`} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-md ring-4 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/128x128/E0E0E0/4A4A4A?text=${name.charAt(0)}`; }}
            />
            <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
            <p className="text-blue-600">{role}</p>
            <div className="flex justify-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Linkedin className="w-5 h-5 text-gray-400" />
            </div>
        </div>
    </a>
);


// --- Section Components ---

const AboutSection = () => (
    <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">About LPUStay</h2>
                    <p className="text-lg text-gray-600 mb-6">
                        LPUStay was born from a simple idea: to make finding the perfect off-campus housing near LPU a seamless and stress-free experience. We are a team of dedicated professionals, many of us LPU alumni, who understand the challenges students face when looking for a place to call home.
                    </p>
                    <p className="text-gray-600">
                        Our platform connects students with verified, high-quality accommodations, from PGs to apartments, ensuring safety, comfort, and convenience. We're more than just a listing service; we're your trusted partner in your academic journey.
                    </p>
                </div>
                <div className="relative h-64 md:h-full">
                    <img 
                        src="https://ik.imagekit.io/tanmoycodes/PGHunter.png?updatedAt=1752302407422" 
                        alt="Modern student accommodation" 
                        className="w-100 h-auto object-cover scale-[1.4] rounded-4xl"
                    />
                </div>
            </div>
        </div>
    </section>
);

const FullTeamModal = ({ members, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-8 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors">
                <X size={28} />
            </button>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Our Entire Team</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.map(member => <TeamMemberCard key={member.name} {...member} />)}
            </div>
        </div>
    </div>
);


const TeamSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allTeamMembers = [
        { name: 'Aditya Kumar', role: 'Founder & CEO', image: 'https://placehold.co/128x128/c7d2fe/3730a3?text=AS', linkedinUrl: '#' },
        { name: 'Karanjeet Kumar', role: 'Founder and Head of Operations', image: 'https://ik.imagekit.io/tanmoycodes/PgHunter/Karan.png?updatedAt=1752401866256', linkedinUrl: 'https://www.linkedin.com/in/k4karan' },
        { name: 'Tanmoy Debnath', role: 'Founder & CTO', image: 'https://ik.imagekit.io/tanmoycodes/Tanmoy%20Image.png?updatedAt=1751476499338', linkedinUrl: '#' },
        { name: 'Rohit Kumar', role: 'Backend Engineer', image: 'https://placehold.co/128x128/c7d2fe/3730a3?text=RK', linkedinUrl: '#' },
        { name: 'Aman Kumar', role: 'Marketing Director', image: 'https://placehold.co/128x128/f3e8ff/9333ea?text=AK', linkedinUrl: '#' },
        ,
    ];
    
    const featuredMembers = allTeamMembers.slice(0, 8);
    const remainingMembers = allTeamMembers.slice(9, 14);


    return (
        <section id="team" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Meet Our Team</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                    The passionate individuals dedicated to making your student life easier and more comfortable.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredMembers.map(member => <TeamMemberCard key={member.name} {...member} />)}
                </div>
                
                <div className="mt-16 flex justify-center">
                    <button onClick={() => setIsModalOpen(true)} className="group inline-flex items-center bg-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex -space-x-4">
                            {remainingMembers.map((member, index) => (
                                <img 
                                    key={member.name}
                                    className="w-12 h-12 rounded-full object-cover border-4 border-white group-hover:border-blue-100 transition-colors duration-300"
                                    src={member.image} 
                                    alt={member.name}
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/48x48/E0E0E0/4A4A4A?text=${member.name.charAt(0)}`; }}
                                />
                            ))}
                        </div>
                        <span className="ml-4 text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">Meet the full team</span>
                    </button>
                </div>
            </div>
            {isModalOpen && <FullTeamModal members={allTeamMembers} onClose={() => setIsModalOpen(false)} />}
        </section>
    );
};

const WhatWeDoSection = () => (
    <section id="what-we-do" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">What We Do & How We Do It</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We simplify the housing search through a curated, tech-driven approach focused on quality and trust.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <InfoCard
                    icon={<Search className="w-6 h-6 text-blue-600" />}
                    title="Curated Listings"
                    className="border-t-4 border-blue-500"
                >
                    We personally vet and verify every property listed on our platform. Our team conducts on-site checks for safety, hygiene, and amenities, so you only see the best options.
                </InfoCard>
                <InfoCard
                    icon={<Building2 className="w-6 h-6 text-green-600" />}
                    title="Seamless Booking"
                    className="border-t-4 border-green-500"
                >
                    Our intuitive platform allows you to filter, compare, and book your chosen accommodation with just a few clicks. Transparent pricing means no hidden surprises.
                </InfoCard>
                <InfoCard
                    icon={<Smile className="w-6 h-6 text-purple-600" />}
                    title="Student Support"
                    className="border-t-4 border-purple-500"
                >
                    Our support doesn't end after booking. We're here to assist you throughout your stay, from resolving maintenance issues to providing community support.
                </InfoCard>
            </div>
        </div>
    </section>
);

const UspSection = () => (
    <section id="usp" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our USP</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    What makes LPUStay the #1 choice for students.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full"><Target className="w-6 h-6 text-blue-600" /></div>
                    <div>
                        <h3 className="text-lg font-semibold">100% Verified Properties</h3>
                        <p className="text-gray-600">No fakes, no disappointments. Every listing is physically checked by our team for quality and accuracy.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-green-100 p-3 rounded-full"><Heart className="w-6 h-6 text-green-600" /></div>
                    <div>
                        <h3 className="text-lg font-semibold">Student-Centric Amenities</h3>
                        <p className="text-gray-600">We prioritize what matters to you: high-speed Wi-Fi, study areas, security, and proximity to campus.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full"><Users className="w-6 h-6 text-purple-600" /></div>
                    <div>
                        <h3 className="text-lg font-semibold">Vibrant Community</h3>
                        <p className="text-gray-600">Connect with fellow students through our community events and app features, making your new city feel like home.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const WhyChooseUsSection = () => (
   <section id="why-choose-us" class="py-16 md:py-24 bg-gray-50">
    <div class="container mx-auto px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 md:gap-16 md:items-start">
            
            <div class="relative ">
                <div class="aspect-w-4 aspect-h-3 rounded-2xl shadow-2xl overflow-hidden transition-transform duration-500 ease-in-out group">
                    <img 
                        src="https://ik.imagekit.io/tanmoycodes/MeetOurTeam.jpg" 
                        alt="Happy student in their room" 
                        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            <div class="text-center md:text-left">
                <h2 class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Why Choose Us?
                </h2>
                <p class="text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
                    Discover a seamless and trustworthy way to find your next home. We prioritize your time, safety, and satisfaction.
                </p>
                <ul class="space-y-6">
                    <li class="flex items-start">
                        <div class="flex-shrink-0 bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-gray-800">Save Time & Effort</h3>
                            <p class="text-gray-600">Our curated platform helps you find the perfect home in minutes, not hours of endless scrolling.</p>
                        </div>
                    </li>
                    <li class="flex items-start">
                        <div class="flex-shrink-0 bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-gray-800">Transparent & Trustworthy</h3>
                            <p class="text-gray-600">We provide clear pricing, verified photos, and authentic reviews for complete peace of mind.</p>
                        </div>
                    </li>
                    <li class="flex items-start">
                       <div class="flex-shrink-0 bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                            <h3 class="font-semibold text-lg text-gray-800">Dedicated Support</h3>
                            <p class="text-gray-600">Our friendly team is always available to assist you with any questions or concerns during your stay.</p>
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</section>
);

{/*const ContactSection = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('sent');
            e.target.reset();
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-blue-600 text-white">
            <div className="container mx-auto px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">We'd Love to Hear From You</h2>
                <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-10">
                    Whether you have a question, a suggestion, or just want to say hi, our door is always open.
                </p>
                <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" required className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" required className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" rows="4" required className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" disabled={status === 'sending'} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-colors">
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                                <Send className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </form>
                    {status === 'sent' && <p className="text-green-600 mt-4 text-center">Thank you! Your message has been sent.</p>}
                </div>
            </div>
        </section>
    );
};*/}




// --- Main App Component ---
export default function App() {
  return (
    <div className="bg-gray-50 font-sans antialiased">
      <main>
        <AboutSection />
        <TeamSection />
        <WhatWeDoSection />
        <UspSection />
        <WhyChooseUsSection />
        
      </main>
    </div>
  );
}