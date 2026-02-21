import React from 'react';
import SummaryCards from './SummaryCards';

import Charts from './Charts';
import SubscriptionList from './SubscriptionList';
import { Animation } from './solarSystem/SolarSystem';
import type { Subscription } from '../types';
import './Dashboard.css';

interface DashboardProps {
  subscriptions: Subscription[];
}

const Dashboard: React.FC<DashboardProps> = ({ subscriptions }) => {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="header-title">💰 Subscription Black Hole</h1>
          <p className="header-subtitle">
            Watch your recurring payments orbit a cosmic financial drain
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="dashboard-main">
        {/* Summary cards */}
        <SummaryCards subscriptions={subscriptions} />

        {/* Black hole visualization */}
        <section className="visualization-section">
          <h2 className="section-title">Financial Gravity Well</h2>
          <div className="visualization-wrapper">
            <Animation/>
          </div>
        </section>

        {/* Charts */}
        <section className="charts-section">
          <Charts subscriptions={subscriptions} />
        </section>

        {/* Subscription list */}
        <section className="list-section">
          <SubscriptionList subscriptions={subscriptions} />
        </section>

        {/* Footer message */}
        <footer className="dashboard-footer">
          <p>
            Insight: Your subscriptions cost <strong>${subscriptions
              .reduce((sum, s) => sum + s.monthlyCost, 0)
              .toFixed(2)}</strong> per month.
            That's <strong>${(subscriptions.reduce((sum, s) => sum + s.monthlyCost, 0) * 12).toFixed(2)}</strong> every year!
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
