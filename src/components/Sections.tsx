import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, Star, Shield, 
  Phone, ArrowRight, Droplets, Sparkles, Car
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { QuoteModal } from './QuoteModal';

export const Hero = ({ onBookClick }: { onBookClick: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-[100px] pb-[20px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/1z9LGKzm/hero-carwash-sr2o3-Wq.jpg" 
          alt="Luxury car detailing" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand/30 bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6">
              <Star className="w-3 h-3 fill-brand" /> Top Rated in Venice
            </div>
            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.85] mb-6">
              PREMIUM AUTO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-yellow-200">CARE REFINED.</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-muted mb-10 max-w-xl font-light leading-relaxed">
              Elevating the way you care for your vehicle. Expert mobile detailing, advanced paint correction, and resilient ceramic coatings delivered straight to your driveway.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onBookClick}
                className="bg-brand text-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-brand-hover transition-colors flex items-center justify-center gap-2 group"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-border-subtle bg-bg-surface/50 backdrop-blur-sm text-white px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-bg-surface transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </button>
            </div>
          </motion.div>

          {/* Quick Features */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-border-subtle/50 pt-8"
          >
            {[
              { icon: Sparkles, text: "Luxury Detail" },
              { icon: Shield, text: "Ceramic Coating" },
              { icon: Droplets, text: "Paint Correction" },
              { icon: Car, text: "Fully Mobile" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-text-muted font-medium">
                <item.icon className="w-4 h-4 text-brand" />
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export const Stats = () => {
  return (
    <section className="py-12 border-y border-border-subtle bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border-subtle/50">
          {[
            { value: "2,500+", label: "Cars Detailed" },
            { value: "1,200+", label: "Happy Clients" },
            { value: "10+", label: "Years Experience" },
            { value: "5.0", label: "Average Rating" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center">
              <span className="font-display text-4xl sm:text-5xl text-brand mb-2">{stat.value}</span>
              <span className="text-xs sm:text-sm text-text-muted uppercase tracking-widest font-semibold">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop" 
                alt="Detailing professional at work" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-8 -right-8 bg-brand text-black p-8 max-w-xs hidden sm:block">
              <h4 className="font-display text-2xl mb-2">WORKING HOURS</h4>
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex justify-between border-b border-black/10 pb-1"><span>MON - FRI</span> <span>8:00AM - 6:00PM</span></li>
                <li className="flex justify-between border-b border-black/10 pb-1"><span>SATURDAY</span> <span>10:00AM - 4:00PM</span></li>
                <li className="flex justify-between text-black/60"><span>SUNDAY</span> <span>CLOSED</span></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-brand text-sm font-bold uppercase tracking-widest mb-4">About Venice Detailing</h4>
            <h2 className="font-display text-5xl sm:text-6xl leading-[0.9] mb-8">
              DRIVEN BY THE DETAILS, TRUSTED BY CAR OWNERS.
            </h2>
            <div className="space-y-6 text-text-muted font-light text-lg">
              <p>
                At Venice Detailing, we believe a clean car is more than just appearance — it's about care, protection, and pride in every drive.
              </p>
              <p>
                We are a professional car wash and detailing service dedicated to restoring and maintaining the true beauty of your vehicle. With a skilled team, premium-grade products, and proven detailing techniques, we deliver consistent results you can see and feel.
              </p>
              <p>
                From daily drivers to luxury cars, we treat every vehicle with precision and respect. Our process focuses not only on deep cleaning, but also on protecting surfaces and extending the life of your car's interior and exterior.
              </p>
            </div>
            
            <div className="mt-10">
               <Link to="/about" className="border-b-2 border-brand pb-1 text-white font-bold uppercase tracking-widest hover:text-brand transition-colors inline-flex items-center gap-2">
                Read Our Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Services = ({ onBookClick }: { onBookClick: () => void }) => {
  const services = [
    {
      id: "01",
      title: "Exterior Wash & Protection",
      desc: "Our exterior wash service removes dirt, grime, and road residue while protecting your paintwork. Using premium shampoos and safe washing techniques, we restore gloss.",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2069&auto=format&fit=crop",
      highlights: ["Hand wash & rinse", "Wheel & tire cleaning", "Paint-safe products", "Protective finishing coat"]
    },
    {
      id: "02",
      title: "Interior Deep Detailing",
      desc: "We deep-clean your car's interior to remove dust, stains, and odors. Every surface is carefully treated to create a fresh, comfortable, and hygienic driving environment.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
      highlights: ["Vacuum & dust removal", "Seat & carpet cleaning", "Dashboard & panel detailing", "Odor elimination"]
    },
    {
      id: "03",
      title: "Paint Protection & Polishing",
      desc: "Enhance your car's paint with professional polishing and protective treatments. This service improves gloss while helping shield your vehicle from environmental damage.",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop",
      highlights: ["Machine polishing", "Swirl mark reduction", "Ceramic coating options", "Long-lasting shine"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h4 className="text-brand text-sm font-bold uppercase tracking-widest mb-4">Our Services</h4>
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.9]">
            PREMIUM CAR CARE<br/>SERVICES
          </h2>
        </div>

        <div className="space-y-12">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center border border-border-subtle p-6 sm:p-8 bg-bg-base hover:border-brand/30 transition-colors group`}>
              
              {/* Image */}
              <div className="w-full lg:w-1/2 overflow-hidden aspect-[4/3] relative">
                <div className="absolute top-4 left-4 z-10 bg-brand text-black font-display text-xl px-3 py-1">
                  {service.id}
                </div>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="font-display text-3xl sm:text-4xl uppercase">{service.title}</h3>
                <p className="text-text-muted font-light leading-relaxed">
                  {service.desc}
                </p>
                
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-widest mb-4">Highlights:</h5>
                  <ul className="space-y-3">
                    {service.highlights.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={onBookClick}
                    className="bg-transparent border border-white text-white px-8 py-3 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                  >
                    Book This Service
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Process = () => {
  const steps = [
    {
      num: "1",
      title: "Schedule & Confirm",
      desc: "Schedule your appointment online or by phone and receive an instant confirmation."
    },
    {
      num: "2",
      title: "We Arrive & Detail",
      desc: "We arrive at your location and detail your vehicle with trusted products and proven techniques."
    },
    {
      num: "3",
      title: "Review & Approve",
      desc: "Review the results, approve the meticulous work, and we seamlessly finalize payment."
    }
  ];

  return (
    <section id="process" className="py-24 bg-bg-base relative overflow-hidden">
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
        <span className="font-display text-[15vw] leading-none whitespace-nowrap">HOW IT WORKS</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h4 className="text-brand text-sm font-bold uppercase tracking-widest mb-4">The Process</h4>
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.9]">
            GETTING SERVICED IS SIMPLE.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-border-subtle sm:-translate-x-1/2"></div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-8 ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                
                {/* Number Circle */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 w-14 h-14 rounded-full bg-bg-base border-2 border-brand flex items-center justify-center font-display text-2xl text-brand z-10">
                  {step.num}
                </div>

                {/* Content */}
                <div className={`w-full sm:w-1/2 pl-20 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-16 sm:text-right' : 'sm:pl-16'}`}>
                  <h3 className="font-display text-2xl mb-3 uppercase">{step.title}</h3>
                  <p className="text-text-muted font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqs = [
    {
      q: "What makes Venice Detailing different from others?",
      a: "We focus on meticulous attention to detail, using only premium, paint-safe products. Our mobile service brings the luxury detailing experience directly to your driveway, saving you time without compromising on quality."
    },
    {
      q: "Do you offer fully mobile car detailing?",
      a: "Yes, we are a fully mobile service. We bring our own water and power supply if needed, allowing us to detail your vehicle at your home, office, or apartment complex."
    },
    {
      q: "Is ceramic coating worth it for cars?",
      a: "Absolutely. Ceramic coating provides a durable, hydrophobic layer that protects your paint from UV rays, bird droppings, and minor scratches, while making it significantly easier to clean and maintain a high-gloss finish."
    },
    {
      q: "Do you offer paint correction for scratches?",
      a: "Yes, our paint correction services use machine polishing to safely remove swirl marks, light scratches, and oxidation, restoring your vehicle's clear coat to a mirror-like finish."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.9] mb-4">
            FREQUENTLY ASKED
          </h2>
          <p className="text-text-muted">Answers to the most common questions from our clients.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-border-subtle bg-bg-base overflow-hidden"
            >
              <button 
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-lg pr-8">{faq.q}</span>
                <ChevronRight className={`w-5 h-5 text-brand transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-90' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-text-muted font-light leading-relaxed border-t border-border-subtle/30 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CTA = ({ onBookClick }: { onBookClick: () => void }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <section className="py-24 bg-brand text-black relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-display text-5xl sm:text-7xl leading-[0.9] mb-6 uppercase">
            Ready for the Venice Treatment?
          </h2>
          <p className="text-lg sm:text-xl font-medium mb-10 max-w-2xl mx-auto opacity-80">
            View pricing and book any service online 24/7. No credit card required. Experience premium detailing at your convenience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={onBookClick}
              className="bg-black text-white px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-zinc-900 transition-colors"
            >
              Book Online Now
            </button>
            <button 
              onClick={() => setIsQuoteOpen(true)}
              className="border-2 border-black text-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
};
