import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { About, CTA } from '../components/Sections';

export const AboutPage = () => {
  const { onBookClick } = useOutletContext<{ onBookClick: () => void }>();

  return (
    <div className="pt-20">
      <About />
      <CTA onBookClick={onBookClick} />
    </div>
  );
};
