import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';
import type { FeaturesTabsProps } from './FeaturesTabs.types';

export const FeaturesTabs: React.FC<FeaturesTabsProps> = ({
  title,
  subtitle,
  tabs,
  className,
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section className={cn('py-20 bg-slate-50 dark:bg-slate-900', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-4xl font-bold dark:text-white mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400">{subtitle}</p>}
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-6 py-3 rounded-lg font-semibold transition-all',
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              )}
            >
              {tab.icon && <span className="inline-block mr-2">{tab.icon}</span>}
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-3xl font-bold dark:text-white mb-4">{active.title}</h3>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            {active.description}
          </p>
          {active.content}
        </motion.div>
      </div>
    </section>
  );
};
