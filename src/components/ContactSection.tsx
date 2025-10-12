'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
  };

  return (
    <section className="py-20 px-6 text-primary-text bg-[#3E2C20]/90" id="contact">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left - Info */}
        <div className="flex flex-col h-full text-accent-text space-y-6">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 mt-10">
              Contact <span className="text-button-gold">Us</span>
            </h2>

            <p className="text-[#f5e7d7]/90 text-base sm:text-lg mt-7 leading-relaxed">
              Have a question, suggestion, or need help with your order?
              Our team is here to assist you with anything you need.
              We usually reply within 24 hours. Don&#39;t hesitate to reach out!
            </p>
          </div>

          <div className="mt-8 space-y-4 text-sm sm:text-base">
            <p className="flex items-center gap-3">
              <Phone className="text-button-gold w-5 h-5" />
              +92 300 1234567
            </p>
            <p className="flex items-center gap-3">
              <Mail className="text-button-gold w-5 h-5" />
              support@nuroxa.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-button-gold w-5 h-5" />
              Karachi, Pakistan
            </p>
          </div>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#5C4033]/80 p-6 sm:p-8 rounded-lg shadow-lg space-y-5 w-full"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#f7ca90] text-black placeholder:text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-button-gold"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#f7ca90] text-black placeholder:text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-button-gold"
              placeholder="you@email.com"
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block mb-1 text-sm font-medium">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#f7ca90] text-black placeholder:text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-button-gold"
              placeholder="Subject"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 text-sm font-medium">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#f7ca90] text-black placeholder:text-[#5C4033] focus:outline-none focus:ring-2 focus:ring-button-gold"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-button-gold text-white rounded-lg hover:bg-button-hover transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
