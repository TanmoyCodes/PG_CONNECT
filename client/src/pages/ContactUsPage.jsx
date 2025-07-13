
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

// Main App Component
export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
      <ContactUs />
    </div>
  );
}

// Contact Us Component
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedbackMessage('');

    // --- Form validation ---
    if (!formData.name || !formData.email || !formData.message) {
      setFeedbackMessage('Please fill out all fields.');
      setIsSubmitting(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setFeedbackMessage('Please enter a valid email address.');
        setIsSubmitting(false);
        return;
    }

    // --- Mock submission ---
    console.log('Form Data Submitted:', formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setFeedbackMessage('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFeedbackMessage(''), 5000); // Clear message after 5 seconds
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side: Contact Information & Map */}
          <div className="p-8 bg-blue-600 text-white">
            <h2 className="text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-blue-100 mb-8">We'd love to hear from you. Here's how you can reach us.</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin size={24} className="flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Our Location</h3>
                  <p className="text-blue-200">Lovely Professional University, Jalandhar-Delhi G.T. Road, Phagwara, Punjab 144411</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail size={24} className="flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <a href="mailto:info@lpustay.com" className="text-blue-200 hover:text-white transition-colors">info@lpustay.com</a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone size={24} className="flex-shrink-0 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <a href="tel:+911234567890" className="text-blue-200 hover:text-white transition-colors">+91 123 456 7890</a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="mt-10">
                <div className="rounded-xl overflow-hidden shadow-lg border-4 border-blue-500">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3413.340217931215!2d75.7026752755982!3d31.18330087436737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5f5e7427184b%3A0x213394733478252!2sLovely%20Professional%20University!5e0!3m2!1sen!2sin!4v1720190089874!5m2!1sen!2sin"
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="LPU Location"
                    ></iframe>
                </div>
            </div>
          </div>
          
          {/* Right Side: Contact Form */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    required
                  />
                </div>
                
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1 block">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message here..."
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-none"
                    required
                  ></textarea>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>

              {/* Feedback Message */}
              {feedbackMessage && (
                <p className={`mt-4 text-center text-sm font-medium ${feedbackMessage.includes('Thank you') ? 'text-green-600' : 'text-red-600'}`}>
                  {feedbackMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
