import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import type { Subscription } from '../types';
import './SummaryCards.css';

interface SummaryCardsProps {
  subscriptions: Subscription[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ subscriptions }) => {
  const metrics = useMemo(() => {
    const totalMonthly = subscriptions.reduce((sum, sub) => sum + sub.monthlyCost, 0);
    const totalYearly = totalMonthly * 12;
    const average = subscriptions.length > 0 ? totalMonthly / subscriptions.length : 0;

    return {
      totalMonthly: totalMonthly.toFixed(2),
      totalYearly: totalYearly.toFixed(2),
      average: average.toFixed(2),
      count: subscriptions.length,
    };
  }, [subscriptions]);

  const cards = [
    {
      label: 'Monthly Cost',
      value: `$${metrics.totalMonthly}`,
      icon: '💰',
      color: 'card-orange',
      delay: 0,
    },
    {
      label: 'Yearly Cost',
      value: `$${metrics.totalYearly}`,
      icon: '📊',
      color: 'card-purple',
      delay: 0.1,
    },
    {
      label: 'Average Cost',
      value: `$${metrics.average}`,
      icon: '📈',
      color: 'card-blue',
      delay: 0.2,
    },
    {
      label: 'Active Subscriptions',
      value: metrics.count,
      icon: '🎯',
      color: 'card-cyan',
      delay: 0.3,
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className={`summary-card ${card.color}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: card.delay, ease: 'easeOut' }}
        >
          <div className="card-icon">{card.icon}</div>
          <div className="card-label">{card.label}</div>
          <div className="card-value">{card.value}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default SummaryCards;
