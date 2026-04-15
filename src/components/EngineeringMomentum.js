"use client";
import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function EngineeringMomentum({ heatmap }) {
  const chartData = useMemo(() => {
    if (!heatmap || heatmap.length === 0) return [];
    
    // Group heatmap days into weeks (52 weeks)
    // The heatmap from githubService is ordered from oldest to newest (index i=0 is most current? No, generation loop is i=365 down to 0)
    // Actually, in fetchGraphQLData it is pushed week by week.
    
    const weeks = [];
    for (let i = 0; i < heatmap.length; i += 7) {
      const weekChunk = heatmap.slice(i, i + 7);
      const weeklySum = weekChunk.reduce((sum, day) => sum + day.count, 0);
      weeks.push({
        name: `Week ${Math.floor(i / 7) + 1}`,
        count: weeklySum,
        date: weekChunk[0]?.date
      });
    }
    return weeks;
  }, [heatmap]);

  return (
    <div style={{ width: '100%', height: '300px', marginTop: '1rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="momentumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c8ff00" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="#c8ff00" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            hide 
          />
          <YAxis 
            hide 
            domain={[0, 'auto']}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 18, 0.95)', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#c8ff00', fontWeight: 'bold' }}
            cursor={{ stroke: 'rgba(200, 255, 0, 0.2)', strokeWidth: 2 }}
            formatter={(value) => [`${value} contributions`, 'Momentum']}
            labelFormatter={(label) => `Time Period: ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#c8ff00" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#momentumGradient)" 
            animationDuration={2500}
            animationBegin={800}
            activeDot={{ r: 6, fill: '#c8ff00', stroke: '#000', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
