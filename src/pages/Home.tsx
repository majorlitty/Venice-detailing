import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero, Stats, FAQ, CTA } from '../components/Sections';
import { Testimonials } from '../components/Testimonials';

export const Home = () => {
  const { onBookClick } = useOutletContext<{ onBookClick: () => void }>();

  return (
    <>
      <Hero onBookClick={onBookClick} />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA onBookClick={onBookClick} />
    </>
  );
};
