"use client";
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#c8ff00', '#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b', '#10b981'];

export default function StackDistribution({ languages }) {
  const data = React.useMemo(() => {
    return Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([name, value]) => ({ name, value }));
  }, [languages]);

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
            animationDuration={2000}
            animationBegin={1000}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]}44)` }}
              />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(15, 15, 18, 0.95)', 
              borderRadius: '12px', 
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: '#fff',
              fontSize: '11px'
            }}
            itemStyle={{ fontWeight: 'bold' }}
            cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 1 }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ 
                fontSize: '10px', 
                color: '#999', 
                paddingTop: '20px', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em' 
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
