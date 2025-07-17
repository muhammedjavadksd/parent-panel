import React from 'react';
import { DASHBOARD_CONSTANTS } from '@/shared/constants/dashboard';
import { BookOpen, Clock, Target } from 'lucide-react';

const ProgressStats = ({ statsData }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="relative group">
            <div className={`bg-gradient-to-br ${stat.bgGradient} p-4 rounded-2xl border-2 ${stat.borderColor} hover:shadow-xl transition-all duration-500 hover:-translate-y-1 premium-card`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`${stat.accentColor} p-2.5 rounded-xl shadow-lg text-white`}>
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                </div>
                <div className="text-right">
                  <p className="text-lg lg:text-xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium">of {stat.target}</p>
                </div>
              </div>
              <h3 className="text-sm lg:text-base font-bold text-gray-800 mb-3 tracking-tight">{stat.title}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600 font-medium">Progress</span>
                  <span className={`text-xs font-bold ${stat.color}`}>{stat.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${stat.accentColor} shadow-sm`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ProgressStats);
