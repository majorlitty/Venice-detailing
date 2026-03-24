import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Michael T.',
    service: 'Ceramic Coating',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    quote: "Absolutely incredible work. My 911 looks better than the day I drove it off the lot. The attention to detail on the ceramic coating is flawless. Highly recommend their mobile service."
  },
  {
    id: 2,
    name: 'Sarah L.',
    service: 'Interior Deep Detail',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    quote: "Professional, punctual, and meticulous. They managed to get a coffee stain out of my white leather seats that I thought was permanent. The car smells brand new again."
  },
  {
    id: 3,
    name: 'David R.',
    service: 'Paint Correction',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    quote: "I had heavy swirl marks from automatic car washes. The Venice team spent hours doing a 2-step correction and the paint is like glass now. The convenience of them coming to my house is unbeatable."
  }
];

export const Testimonials = () => {
  return (
    <section id="reviews" className="py-24 bg-bg-surface border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="text-brand text-sm font-bold uppercase tracking-widest mb-4">Client Reviews</h4>
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.9] mb-8">
            WHAT THEY SAY
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-base border border-border-subtle p-8 hover:border-brand/30 transition-colors flex flex-col h-full"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-brand text-brand" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-text-muted font-light leading-relaxed mb-8 flex-grow">
                "{testimonial.quote}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border-subtle/50">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border border-border-subtle"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wider">{testimonial.name}</h4>
                  <p className="text-brand text-xs font-medium mt-1">{testimonial.service}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
