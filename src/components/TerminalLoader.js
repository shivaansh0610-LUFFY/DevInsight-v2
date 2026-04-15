"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultLogs = [
  { text: "Establishing secure connection to GitHub Edge...", type: "info" },
  { text: "Injecting semantic heuristics into Gemini 2.5 Flash...", type: "info" },
  { text: "Fetching public repository telemetry for target user...", type: "process" },
  { text: "Analyzing repository AST nodes and code patterns...", type: "process" },
  { text: "Running Authenticity Engine algorithms...", type: "process" },
  { text: "Calculating engineering maturity vectors...", type: "process" },
  { text: "Mapping technology stack expansion trajectory...", type: "process" },
  { text: "Evaluating technical depth and system architecture...", type: "process" },
  { text: "Syncing Consistency Engine: Heatmap calibration active.", type: "success" },
  { text: "AI verification complete: High-confidence rating locked.", type: "success" },
  { text: "Generating holistic developer intelligence report.", type: "info" },
  { text: "Analysis complete. Redirecting to Matrix Dashboard...", type: "success" },
];

export default function TerminalLoader({ user }) {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < defaultLogs.length) {
      // Calculate delay based on 5.5 second target duration (5500 / 12 logs ~= 450ms)
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, defaultLogs[index]]);
        setIndex((prev) => prev + 1);
      }, 300 + Math.random() * 300); // 300-600ms per log
      return () => clearTimeout(timer);
    }
  }, [index]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(15px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '700px',
        background: '#09090b',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 0 100px rgba(0, 0, 0, 0.9), 0 0 20px rgba(200, 255, 0, 0.05)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Terminal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          paddingBottom: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', opacity: 0.8 }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', opacity: 0.8 }}></div>
          </div>
          <span style={{ marginLeft: '1rem', fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Neural Processing: <span style={{ color: '#fff' }}>@{user}</span>
          </span>
        </div>

        {/* Terminal Output */}
        <div style={{ height: '340px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {visibleLogs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                fontSize: '0.85rem',
                lineHeight: '1.5',
                color: log.type === 'success' ? '#c8ff00' : log.type === 'info' ? '#a1a1aa' : '#38bdf8'
              }}
            >
              <span style={{ color: '#3f3f46', marginRight: '1rem', fontSize: '0.75rem' }}>
                {new Date().toLocaleTimeString([], { hour12: false })}
              </span>
              <span style={{ color: log.type === 'success' ? '#c8ff00' : '#71717a', marginRight: '0.5rem' }}>
                {log.type === 'success' ? '✓' : log.type === 'info' ? '#' : '>'}
              </span>
              {log.text}
            </motion.div>
          ))}
          
          {index < defaultLogs.length && (
             <motion.div 
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                style={{ width: '8px', height: '16px', background: '#c8ff00', marginTop: '4px', display: 'inline-block' }}
             />
          )}
        </div>

        {/* Scanning effect */}
        <motion.div 
          animate={{ translateY: ['0%', '1000%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, rgba(200, 255, 0, 0.05), transparent)',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      </div>
    </motion.div>
  );
}
