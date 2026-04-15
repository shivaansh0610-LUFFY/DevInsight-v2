"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Mail, ArrowRight } from 'lucide-react';

export default function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Artificial delay for "processing" feel
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log(`Email captured for Zero Bugs Club: ${email}`);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(15px)',
            }}
          />

          {/* Modal Container */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            padding: '1.5rem',
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: '500px',
                background: 'rgba(15, 15, 18, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '2.5rem',
                position: 'relative',
                pointerEvents: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(200, 255, 0, 0.05)',
                overflow: 'hidden'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  color: '#52525b',
                  transition: 'color 0.2s',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 2
                }}
                onMouseEnter={(e) => {
                    const icon = e.currentTarget.firstChild;
                    if(icon) icon.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                    const icon = e.currentTarget.firstChild;
                    if(icon) icon.style.color = '#52525b';
                }}
              >
                <X size={24} />
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div style={{ marginBottom: '2.5rem' }}>
                      <span style={{ 
                        color: 'var(--primary)', 
                        textTransform: 'uppercase', 
                        fontSize: '0.75rem', 
                        fontWeight: 800, 
                        letterSpacing: '0.15em',
                        display: 'block',
                        marginBottom: '0.75rem'
                      }}>
                        Restricted Access
                      </span>
                      <h2 style={{ fontSize: '2.25rem', fontWeight: 920, color: '#fff', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                        The <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>Zero Bugs</span> Club
                      </h2>
                      <p style={{ color: '#A1A1AA', fontSize: '1rem', lineHeight: 1.6 }}>
                        Entrance is granted only to those who ship with intensity. Join the private beta queue to secure your perimeter.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
                        <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#52525b' }}>
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@engineering-soul.com"
                          style={{
                            width: '100%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            padding: '1.1rem 1.1rem 1.1rem 3.5rem',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                            e.target.style.boxShadow = '0 0 20px rgba(200, 255, 0, 0.05)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={loading}
                        style={{
                          width: '100%',
                          background: 'var(--primary)',
                          color: '#000',
                          border: 'none',
                          borderRadius: '16px',
                          padding: '1.1rem',
                          fontSize: '1rem',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.75rem',
                          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                          opacity: loading ? 0.7 : 1,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}
                        onMouseEnter={(e) => {
                          if (!loading) {
                            e.target.style.transform = 'translateY(-3px) scale(1.02)';
                            e.target.style.boxShadow = '0 15px 35px rgba(200, 255, 0, 0.25)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!loading) {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        {loading ? 'Validating...' : 'Request Invitation'}
                        {!loading && <ArrowRight size={18} />}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{ textAlign: 'center', padding: '1.5rem 0' }}
                  >
                    <div style={{ color: 'var(--primary)', display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                      <CheckCircle size={72} strokeWidth={1.5} style={{ filter: 'drop-shadow(0 0 20px rgba(200, 255, 0, 0.4))' }} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 920, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.04em' }}>Queue Joined.</h2>
                    <p style={{ color: '#A1A1AA', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                      Manifesto accepted. We will verify your engineering maturity vectors and notify you once the perimeter is open.
                    </p>
                    <button 
                      onClick={onClose}
                      style={{
                        padding: '1rem 2.5rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        color: '#fff',
                        fontWeight: 800,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
                      onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
                    >
                      Return to Surface
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
