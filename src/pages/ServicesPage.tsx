import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Services, Process, CTA } from '../components/Sections';

export const ServicesPage = () => {
  const { onBookClick } = useOutletContext<{ onBookClick: () => void }>();

  return (
    <div className="pt-20">
      <Services onBookClick={onBookClick} />
      <Process />
      <CTA onBookClick={onBookClick} />
    </div>
  );
};
