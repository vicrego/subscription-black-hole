import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { Subscription } from '../types';
import './Charts.css';

interface ChartsProps {
  subscriptions: Subscription[];
}

const Charts: React.FC<ChartsProps> = ({ subscriptions }) => {
  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};
    subscriptions.forEach((sub) => {
      grouped[sub.category] = (grouped[sub.category] || 0) + sub.monthlyCost;
    });
    return Object.entries(grouped).map(([name, cost]) => ({
      name,
      cost: parseFloat(cost.toFixed(2)),
    }));
  }, [subscriptions]);

  const topFive = useMemo(() => {
    return subscriptions
      .sort((a, b) => b.monthlyCost - a.monthlyCost)
      .slice(0, 5)
      .map((sub) => ({
        name: sub.name,
        cost: sub.monthlyCost,
      }));
  }, [subscriptions]);

  const totalCost = categoryData.reduce((sum, item) => sum + item.cost, 0);
  const maxBarCost = Math.max(...topFive.map((item) => item.cost), 1);

  // Colors for categories
  const categoryColors: Record<string, string> = {
    Streaming: '#ff6b9d',
    Software: '#c44569',
    Gaming: '#a8edea',
    Other: '#fed766',
  };

  return (
    <div className="charts-container">
      {/* Pie Chart */}
      <div className="chart pie-chart">
        <h3>Subscriptions by Category</h3>
        <svg viewBox="0 0 200 200" className="pie-svg">
          <defs>
            <filter id="pieGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {categoryData.map((item, index) => {
            const percentage = item.cost / totalCost;
            const startAngle = categoryData
              .slice(0, index)
              .reduce((sum, i) => sum + (i.cost / totalCost) * 360, 0);
            const endAngle = startAngle + percentage * 360;

            const startRad = ((startAngle - 90) * Math.PI) / 180;
            const endRad = ((endAngle - 90) * Math.PI) / 180;

            const x1 = 100 + 80 * Math.cos(startRad);
            const y1 = 100 + 80 * Math.sin(startRad);
            const x2 = 100 + 80 * Math.cos(endRad);
            const y2 = 100 + 80 * Math.sin(endRad);

            const largeArc = percentage > 0.5 ? 1 : 0;

            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
              `Z`,
            ].join(' ');

            return (
              <motion.path
                key={item.name}
                d={pathData}
                fill={categoryColors[item.name] || '#999'}
                stroke="rgba(0, 0, 0, 0.3)"
                strokeWidth="1"
                opacity={0.7}
                filter="url(#pieGlow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                style={{ cursor: 'pointer' }}
              />
            );
          })}

          {/* Center circle for donut effect */}
          <circle cx="100" cy="100" r="50" fill="rgba(10, 14, 39, 0.9)" />
        </svg>

        {/* Category legend */}
        <div className="chart-legend">
          {categoryData.map((item) => (
            <div key={item.name} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: categoryColors[item.name] }}
              />
              <span className="legend-label">{item.name}</span>
              <span className="legend-value">${item.cost.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="chart bar-chart">
        <h3>Top 5 Most Expensive</h3>
        <div className="bar-container">
          {topFive.map((item, index) => (
            <motion.div
              key={item.name}
              className="bar-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bar-label">
                <span className="bar-name">{item.name}</span>
                <span className="bar-value">${item.cost.toFixed(2)}</span>
              </div>
              <div className="bar-wrapper">
                <motion.div
                  className="bar"
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.cost / maxBarCost) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  style={{
                    background: `linear-gradient(90deg, #ff6b9d, #c44569)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Charts;
