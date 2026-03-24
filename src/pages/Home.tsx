import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero, Stats, FAQ, CTA } from '../components/Sections';
import { Testimonials } from '../components/Testimonials';
import { Portfolio } from '../components/Portfolio';

export const Home = () => {
  const { onBookClick } = useOutletContext<{ onBookClick: () => void }>();

  return (
    <>
      <Hero onBookClick={onBookClick} />
      <Stats />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <CTA onBookClick={onBookClick} />
    </>
  );
};
