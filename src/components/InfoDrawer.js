"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import styles from "../app/page.module.css";
import AboutView from "./AboutView";
import TechView from "./TechView";

export default function InfoDrawer({ isOpen, onClose, view }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10000,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '600px',
              height: '100vh',
              backgroundColor: 'rgba(10, 10, 11, 0.98)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              zIndex: 10001,
              padding: '3rem 2.5rem',
              overflowY: 'auto',
              boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                color: '#fff',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
            >
              <X size={20} />
            </button>

            <div style={{ marginTop: '2rem' }}>
              {view === 'about' ? <AboutView /> : <TechView />}
            </div>

            {/* Footer hint */}
            <div style={{ 
              marginTop: '4rem', 
              paddingTop: '2rem', 
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              color: '#52525b',
              fontSize: '0.85rem'
            }}>
              Press ESC or click outside to close the HUD.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
