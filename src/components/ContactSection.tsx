'use client';
import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <section className="w-full bg-cream py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

        <div className="py-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gold mb-6">
            Contact Us
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-greyText mb-8 leading-relaxed">
            We are committed to processing the information in order to contact you
            and talk about your project.
          </p>

          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="text-gold mr-3" size={22} />
              <p className="text-blackText">example@teamwebflow.com</p>
            </div>
            <div className="flex items-center">
              <MapPin className="text-gold mr-3" size={22} />
              <p className="text-blackText">4074 Ebert Summit Suite 375, Lake Leonardchester</p>
            </div>
            <div className="flex items-center">
              <Phone className="text-gold mr-3" size={22} />
              <p className="text-blackText">+44 123 654 7890</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-cream p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder='you@email.com'
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
              required
            />
          </div>

          <div>
            <input
              type="text"
              name="website"
              placeholder='Subject'
              value={formData.website}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder='Your Message'
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gold"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-cream font-medium bg-hero-gradient rounded-lg hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
