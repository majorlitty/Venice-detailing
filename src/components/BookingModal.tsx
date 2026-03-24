import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Car, User, Mail, Phone, CheckCircle2, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICES = [
  "Exterior Wash & Protection",
  "Interior Deep Detailing",
  "Paint Protection & Polishing",
  "Full Detail Package",
  "Ceramic Coating"
];

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
    vehicle: ''
  });

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setStatus('idle');
      setFormData({
        service: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: '',
        vehicle: ''
      });
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      const data = await response.json();
      console.log('Booking success:', data);
      setStatus('success');
    } catch (error) {
      console.error('Booking error:', error);
      setStatus('error');
    }
  };

  const isStep1Valid = formData.service !== '';
  const isStep2Valid = formData.date !== '' && formData.time !== '';
  const isStep3Valid = formData.name !== '' && formData.email !== '';

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
                {status === 'success' ? 'Booking Confirmed' : 'Book Appointment'}
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
                  <h3 className="text-2xl font-display text-white mb-2">You're All Set!</h3>
                  <p className="text-text-muted mb-8">
                    Your appointment for {formData.service} on {formData.date} at {formData.time} has been confirmed. A confirmation email has been sent to {formData.email}.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Progress Bar */}
                  <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i} 
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= step ? 'bg-brand' : 'bg-border-subtle'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Step 1: Service */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-medium text-white mb-4">Select a Service</h3>
                      <div className="space-y-3">
                        {SERVICES.map((service) => (
                          <label 
                            key={service}
                            className={`flex items-center p-4 border cursor-pointer transition-colors ${
                              formData.service === service 
                                ? 'border-brand bg-brand/5' 
                                : 'border-border-subtle bg-bg-base hover:border-brand/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service}
                              checked={formData.service === service}
                              onChange={handleChange}
                              className="hidden"
                            />
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
                              formData.service === service ? 'border-brand' : 'border-text-muted'
                            }`}>
                              {formData.service === service && <div className="w-2.5 h-2.5 bg-brand rounded-full" />}
                            </div>
                            <span className="font-medium text-white">{service}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        type="button"
                        disabled={!isStep1Valid}
                        onClick={nextStep}
                        className="w-full mt-6 bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Next Step <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> Select Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full bg-bg-base border border-border-subtle text-white p-4 focus:outline-none focus:border-brand transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4" /> Select Time
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {TIME_SLOTS.map((time) => (
                            <label 
                              key={time}
                              className={`text-center p-3 border cursor-pointer transition-colors ${
                                formData.time === time 
                                  ? 'border-brand bg-brand/5 text-brand' 
                                  : 'border-border-subtle bg-bg-base text-white hover:border-brand/50'
                              }`}
                            >
                              <input
                                type="radio"
                                name="time"
                                value={time}
                                checked={formData.time === time}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <span className="font-medium text-sm">{time}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-4 border border-border-subtle text-white font-bold uppercase tracking-widest hover:bg-bg-base transition-colors flex items-center justify-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          type="button"
                          disabled={!isStep2Valid}
                          onClick={nextStep}
                          className="flex-1 bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          Next Step <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Info */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
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

                      {status === 'error' && (
                        <div className="p-4 bg-red-500/10 border border-red-500/50 text-red-500 text-sm">
                          There was an error submitting your booking. Please try again.
                        </div>
                      )}

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-4 border border-border-subtle text-white font-bold uppercase tracking-widest hover:bg-bg-base transition-colors flex items-center justify-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={!isStep3Valid || status === 'submitting'}
                          className="flex-1 bg-brand text-black py-4 font-bold uppercase tracking-widest hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {status === 'submitting' ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                          ) : (
                            'Confirm Booking'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
