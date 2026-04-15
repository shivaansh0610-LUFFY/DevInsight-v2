"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';

export default function TechRadar({ languages }) {
  // Convert { JavaScript: 15, Python: 5 } into Recharts compatible array
  const entries = Object.entries(languages || {});
  
  if (entries.length === 0) {
    return (
      <div style={{ width: '100%', height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#52525B', fontSize: '0.9rem' }}>Not enough language data</p>
      </div>
    );
  }

  // Find max for dynamic scaling so the chart always looks full
  const maxCount = Math.max(...entries.map(([, count]) => count), 5); // Fallback max to 5

  const processedData = entries
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([lang, count]) => ({
      subject: lang,
      A: count,
      fullMark: maxCount + Math.max(1, Math.floor(maxCount * 0.1)) // buffer 10%
    }));

  // Ensure we have at least 3 points, otherwise it renders a line or point, not a polygon
  while (processedData.length < 3) {
      processedData.push({ subject: `...`, A: 0, fullMark: maxCount });
  }

  return (
    <div style={{ width: '100%', height: '240px', position: 'relative', zIndex: 10 }}>
      {/* Background glow to make it feel premium */}
      <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          background: 'var(--primary)',
          filter: 'blur(60px)',
          opacity: 0.15,
          zIndex: -1,
          borderRadius: '50%'
      }}></div>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={processedData}>
          <PolarGrid stroke="#27272A" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#A1A1AA', fontSize: 11, fontWeight: 500 }} 
          />
          <Tooltip 
            contentStyle={{ 
                backgroundColor: '#09090B', 
                border: '1px solid #27272A', 
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
            }} 
            itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
            cursor={{ fill: 'rgba(200, 255, 0, 0.1)' }}
          />
          <Radar 
            name="Repositories" 
            dataKey="A" 
            stroke="#00f0ff" // Cyan boundary
            strokeWidth={2}
            fill="var(--primary)" // Neon Lime fill
            fillOpacity={0.35} 
            animationDuration={1500}
            animationEasing="ease-out"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
