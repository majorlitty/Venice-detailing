import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Portfolio } from '../components/Portfolio';
import { CTA } from '../components/Sections';

export const PortfolioPage = () => {
  const { onBookClick } = useOutletContext<{ onBookClick: () => void }>();

  return (
    <div className="pt-20">
      <Portfolio />
      <CTA onBookClick={onBookClick} />
    </div>
  );
};
