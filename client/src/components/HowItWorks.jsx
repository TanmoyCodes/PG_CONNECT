import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      icon: 'fas fa-search',
      title: 'Search & Discover',
      description:
        'Use our filters to find PGs that match your preferences for location, budget, and amenities.',
    },
    {
      icon: 'fas fa-check-circle',
      title: 'Show Interest',
      description:
        'Once you find a PG you like, click "I\'m Interested" and we\'ll notify our team.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'We Connect You',
      description:
        'Our team coordinates with the PG owner and helps you schedule a visit. No direct owner contact needed!',
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
        <p className="text-gray-600 mb-12">Finding your next PG is as easy as 1-2-3.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div
              key={step.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4 inline-block p-5 bg-red-100 text-red-600 rounded-full">
                <i className={`${step.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
  