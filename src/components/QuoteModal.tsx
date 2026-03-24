import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Car, User, Mail, Phone, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "Exterior Wash & Protection",
  "Interior Deep Detailing",
  "Paint Protection & Polishing",
  "Full Detail Package",
  "Ceramic Coating",
  "Other / Custom Request"
];

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    serviceInterest: '',
    details: ''
  });

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStatus('idle');
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        serviceInterest: '',
        details: ''
      });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Placeholder for actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Quote request success:', formData);
      setStatus('success');
    } catch (error) {
      console.error('Quote request error:', error);
      setStatus('error');
    }
  };

  const isValid = formData.name !== '' && formData.email !== '' && formData.serviceInterest !== '';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bg-surface border border-border-subtle shadow-2xl z-[101] max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-subtle sticky top-0 bg-bg-surface z-10">
              <h2 className="font-display text-2xl uppercase tracking-wider text-white">
                {status === 'success' ? 'Request Sent' : 'Request Custom Quote'}
              </h2>
              <button 
                onClick={handleClose}
                className="text-text-muted hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10 text-brand" />
                  </motion.div>
                  <h3 className="text-2xl font-display text-white mb-2">Request Received!</h3>
                  <p className="text-text-muted mb-8">
                    Thank you for reaching out. Our team will review your request for the {formData.vehicle} and get back to you at {formData.email} within 24 hours.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" /> Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                      <Car className="w-4 h-4" /> Vehicle Make & Model
                    </label>
                    <input
                      type="text"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      placeholder="e.g. 2023 Porsche 911"
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">
                      Service of Interest *
                    </label>
                    <select
                      name="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={handleChange}
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors appearance-none"
                      required
                    >
                      <option value="" disabled>Select a service...</option>
                      {SERVICES.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Additional Details
                    </label>
                    <textarea
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      placeholder="Tell us about the condition of your vehicle or any specific concerns..."
                      rows={4}
                      className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                      There was an error submitting your request. Please try again.
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={!isValid || status === 'submitting'}
                      className="w-full bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending Request...</>
                      ) : (
                        'Submit Request'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
