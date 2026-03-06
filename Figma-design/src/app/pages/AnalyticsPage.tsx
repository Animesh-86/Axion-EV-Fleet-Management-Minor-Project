import { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingDown, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { generateBatteryTrendData, generateTemperatureData, generateHealthTrendData } from '../data/mockData';

export function AnalyticsPage() {
  const [batteryData] = useState(generateBatteryTrendData());
  const [temperatureData] = useState(generateTemperatureData());
  const [healthData] = useState(generateHealthTrendData());

  const insights = [
    {
      icon: AlertTriangle,
      color: '#FF3D71',
      title: 'Frequent High-Temperature Events',
      description: '12 vehicles showing consistent thermal spikes above 55°C during charging cycles',
      severity: 'critical'
    },
    {
      icon: TrendingDown,
      color: '#FFB800',
      title: 'Accelerated Battery Degradation',
      description: 'Fleet average battery health decreased 2.3% over last 30 days (expected: 0.8%)',
      severity: 'warning'
    },
    {
      icon: Lightbulb,
      color: '#00E5FF',
      title: 'Rapid Discharge Pattern Detected',
      description: '8 vehicles in Phoenix region showing abnormal discharge rates during idle periods',
      severity: 'info'
    },
    {
      icon: TrendingUp,
      color: '#00FF85',
      title: 'Optimal Performance Cluster',
      description: '67% of fleet maintaining health scores above 90% - exceeding target of 60%',
      severity: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fleet Analytics</h1>
        <p className="text-gray-400">Deep insights into fleet health, performance, and trends</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center gap-2">
        {['24h', '7d', '30d', '90d'].map((range) => (
          <button
            key={range}
            className="px-4 py-2 rounded-lg border border-[#2a3542] text-sm font-medium text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors"
          >
            {range}
          </button>
        ))}
      </div>

      {/* Battery Degradation Trends */}
      <motion.div
        className="p-6 rounded-xl border border-[#2a3542]"
        style={{ backgroundColor: '#121821' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Battery Health Trends</h3>
            <p className="text-sm text-gray-400">Fleet-wide battery performance over 24 hours</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00E5FF' }} />
              <span className="text-sm text-gray-400">Average</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF3D71' }} />
              <span className="text-sm text-gray-400">Degradation</span>
            </div>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={batteryData}>
              <defs>
                <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="degradationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3D71" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#FF3D71" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a3542" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#121821', 
                  border: '1px solid #2a3542',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="average" 
                stroke="#00E5FF" 
                fill="url(#avgGradient)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="degradation" 
                stroke="#FF3D71" 
                fill="url(#degradationGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Temperature Anomaly Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          className="p-6 rounded-xl border border-[#2a3542]"
          style={{ backgroundColor: '#121821' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          whileHover={{ boxShadow: '0 0 30px rgba(255, 184, 0, 0.1)' }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Temperature Anomalies</h3>
            <p className="text-sm text-gray-400">Unusual thermal events detected (24h)</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3542" />
                <XAxis dataKey="time" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121821', 
                    border: '1px solid #2a3542',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="avg" fill="#FFB800" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Health Score Trends */}
        <motion.div
          className="p-6 rounded-xl border border-[#2a3542]"
          style={{ backgroundColor: '#121821' }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ boxShadow: '0 0 30px rgba(108, 99, 255, 0.1)' }}
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-1">Health Score Trends</h3>
            <p className="text-sm text-gray-400">Fleet health evolution (30 days)</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3542" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={10} />
                <YAxis stroke="#6B7280" domain={[70, 90]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121821', 
                    border: '1px solid #2a3542',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#6C63FF" 
                  strokeWidth={3}
                  dot={{ fill: '#6C63FF', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* AI Insights Panel */}
      <motion.div
        className="p-6 rounded-xl border border-[#2a3542]"
        style={{ backgroundColor: '#121821' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)' }}>
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI-Powered Insights</h3>
            <p className="text-sm text-gray-400">Explainable health analysis and recommendations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg border border-[#2a3542] hover:border-[#00E5FF] transition-colors"
              style={{ backgroundColor: '#0B0F14' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${insight.color}20` }}
                >
                  <insight.icon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white mb-1">{insight.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{insight.description}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span 
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: `${insight.color}20`,
                        color: insight.color
                      }}
                    >
                      {insight.severity}
                    </span>
                    <button 
                      className="text-xs hover:underline"
                      style={{ color: '#00E5FF' }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
