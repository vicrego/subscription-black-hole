import React from 'react';
import { motion } from 'motion/react';
import type { Subscription } from '../types';
import './SubscriptionList.css';

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

const categoryEmoji: Record<string, string> = {
  Streaming: '📺',
  Software: '💻',
  Gaming: '🎮',
  Other: '📦',
};

const categoryColors: Record<string, string> = {
  Streaming: '#ff6b9d',
  Software: '#c44569',
  Gaming: '#a8edea',
  Other: '#fed766',
};

const SubscriptionList: React.FC<SubscriptionListProps> = ({ subscriptions }) => {
  const sorted = [...subscriptions].sort((a, b) => b.monthlyCost - a.monthlyCost);

  return (
    <div className="subscription-list">
      <h2>All Subscriptions</h2>

      <div className="list-header">
        <div className="col-name">Name</div>
        <div className="col-category">Category</div>
        <div className="col-monthly">Monthly</div>
        <div className="col-yearly">Yearly</div>
        <div className="col-renewal">Renewal Date</div>
      </div>

      <div className="list-rows">
        {sorted.map((sub, index) => (
          <motion.div
            key={sub.id}
            className="list-row"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ backgroundColor: 'rgba(255, 100, 150, 0.08)' }}
          >
            <div className="col-name">
              <span className="category-emoji">{categoryEmoji[sub.category]}</span>
              {sub.name}
            </div>

            <div className="col-category">
              <span
                className="category-badge"
                style={{ borderColor: categoryColors[sub.category] }}
              >
                {sub.category}
              </span>
            </div>

            <div className="col-monthly">
              <span className="cost">${sub.monthlyCost.toFixed(2)}</span>
            </div>

            <div className="col-yearly">
              <span className="cost yearly">${(sub.monthlyCost * 12).toFixed(2)}</span>
            </div>

            <div className="col-renewal">
              <span className="renewal-date">
                {new Date(sub.renewalDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
