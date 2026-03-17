import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Categories from '../components/Categories';
import Courses from '../components/Courses';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Categories />
      <Features />
      <Courses />
      <Testimonials />
      <ContactSection />
    </div>
  );
};

export default Home;
