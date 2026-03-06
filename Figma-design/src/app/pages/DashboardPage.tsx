import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Activity, TrendingUp, Upload, Battery, Thermometer, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { mockFleetStats, mockVehicles, mockTelemetryEvents } from '../data/mockData';

export function DashboardPage() {
  const [stats, setStats] = useState(mockFleetStats);
  const [telemetryEvents, setTelemetryEvents] = useState(mockTelemetryEvents);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineVehicles: prev.onlineVehicles + (Math.random() > 0.5 ? 1 : -1),
        averageHealth: prev.averageHealth + (Math.random() - 0.5) * 0.5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const healthDistribution = [
    { name: 'Healthy', value: 167, color: '#00FF85' },
    { name: 'Warning', value: 28, color: '#FFB800' },
    { name: 'Critical', value: 8, color: '#FF3D71' },
  ];

  const activityData = Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}:00`,
    events: Math.floor(Math.random() * 50) + 20
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Fleet Overview</h1>
        <p className="text-gray-400">Real-time monitoring and analytics for your EV fleet</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon={Truck}
          label="Total Vehicles"
          value={stats.totalVehicles}
          gradient="from-[#00E5FF] to-[#00B4D8]"
        />
        <KPICard
          icon={Activity}
          label="Online Vehicles"
          value={stats.onlineVehicles}
          gradient="from-[#00FF85] to-[#00D46A]"
          animated
        />
        <KPICard
          icon={TrendingUp}
          label="Avg Health Score"
          value={`${stats.averageHealth.toFixed(1)}%`}
          gradient="from-[#6C63FF] to-[#5A52D5]"
          animated
        />
        <KPICard
          icon={Upload}
          label="Active OTA Campaigns"
          value={stats.activeCampaigns}
          gradient="from-[#FFB800] to-[#FF9500]"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Health Distribution */}
        <motion.div
          className="p-6 rounded-xl border border-[#2a3542]"
          style={{ backgroundColor: '#121821' }}
          whileHover={{ boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Fleet Health Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={healthDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {healthDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#121821', 
                    border: '1px solid #2a3542',
                    borderRadius: '8px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {healthDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-400">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Telemetry Activity */}
        <motion.div
          className="p-6 rounded-xl border border-[#2a3542]"
          style={{ backgroundColor: '#121821' }}
          whileHover={{ boxShadow: '0 0 30px rgba(108, 99, 255, 0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Telemetry Activity (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityData}>
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
                <Line 
                  type="monotone" 
                  dataKey="events" 
                  stroke="#00E5FF" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Live Telemetry Feed */}
      <motion.div
        className="p-6 rounded-xl border border-[#2a3542]"
        style={{ backgroundColor: '#121821' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Live Telemetry Feed</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-auto">
          {telemetryEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="flex items-start gap-4 p-3 rounded-lg border border-[#2a3542] hover:border-[#00E5FF] transition-colors"
              style={{ backgroundColor: '#0B0F14' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`}
                style={{ 
                  backgroundColor: event.severity === 'critical' 
                    ? 'rgba(255, 61, 113, 0.1)' 
                    : event.severity === 'warning' 
                    ? 'rgba(255, 184, 0, 0.1)' 
                    : 'rgba(0, 229, 255, 0.1)' 
                }}
              >
                {event.type === 'battery' && <Battery className="w-5 h-5" style={{ color: event.severity === 'critical' ? '#FF3D71' : '#00E5FF' }} />}
                {event.type === 'temperature' && <Thermometer className="w-5 h-5" style={{ color: '#FFB800' }} />}
                {event.type === 'alert' && <AlertCircle className="w-5 h-5" style={{ color: '#FF3D71' }} />}
                {event.type === 'connection' && <Activity className="w-5 h-5" style={{ color: '#00FF85' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-medium text-white">{event.vehicleId}</span>
                  <span className="text-xs text-gray-500">
                    {Math.floor((Date.now() - event.timestamp.getTime()) / 1000)}s ago
                  </span>
                </div>
                <p className="text-sm text-gray-400">{event.message}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface KPICardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  gradient: string;
  animated?: boolean;
}

function KPICard({ icon: Icon, label, value, gradient, animated }: KPICardProps) {
  return (
    <motion.div
      className="p-6 rounded-xl border border-[#2a3542] relative overflow-hidden"
      style={{ backgroundColor: '#121821' }}
      whileHover={{ 
        boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
        y: -4
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">
          {animated ? (
            <motion.span
              key={value.toString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {value}
            </motion.span>
          ) : (
            value
          )}
        </div>
        <div className="text-sm text-gray-400">{label}</div>
      </div>
    </motion.div>
  );
}
