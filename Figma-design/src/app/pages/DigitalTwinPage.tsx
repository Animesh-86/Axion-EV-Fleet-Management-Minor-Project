import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import { 
  Battery, 
  Gauge, 
  Thermometer, 
  Clock, 
  Wifi, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Signal
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { mockVehicles, mockTelemetryEvents } from '../data/mockData';

export function DigitalTwinPage() {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(mockVehicles.find(v => v.id === vehicleId) || mockVehicles[0]);
  const [isOnline, setIsOnline] = useState(vehicle.status === 'online');

  // Simulate real-time updates
  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        setVehicle(prev => ({
          ...prev,
          battery: Math.max(0, prev.battery + (Math.random() - 0.5) * 2),
          temperature: Math.max(20, prev.temperature + (Math.random() - 0.5) * 3),
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 10),
          lastUpdate: new Date()
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isOnline]);

  const batteryHistory = Array.from({ length: 20 }, (_, i) => ({
    time: `${i}m`,
    battery: vehicle.battery + (Math.random() - 0.5) * 5
  }));

  const temperatureHistory = Array.from({ length: 20 }, (_, i) => ({
    time: `${i}m`,
    temp: vehicle.temperature + (Math.random() - 0.5) * 8
  }));

  const vehicleEvents = mockTelemetryEvents.filter(e => e.vehicleId === vehicle.id).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Digital Twin: {vehicle.id}</h1>
          <p className="text-gray-400">{vehicle.vendor} {vehicle.model} • {vehicle.location}</p>
        </div>
        <div className="flex items-center gap-3">
          <div 
            className="px-4 py-2 rounded-full flex items-center gap-2"
            style={{ 
              backgroundColor: isOnline ? 'rgba(0, 255, 133, 0.1)' : 'rgba(156, 163, 175, 0.1)',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: isOnline ? '#00FF85' : '#9CA3AF' }}
            />
            <span className="text-sm font-medium" style={{ color: isOnline ? '#00FF85' : '#9CA3AF' }}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT PANEL - Digital Twin Visualization */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vehicle Visualization */}
          <motion.div
            className="p-8 rounded-xl border border-[#2a3542] relative overflow-hidden"
            style={{ backgroundColor: '#121821' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/5 to-[#6C63FF]/5" />
            
            <div className="relative z-10">
              {/* Vehicle Silhouette */}
              <div className="flex items-center justify-center mb-8 h-48">
                <motion.div
                  className="relative"
                  animate={{ 
                    opacity: isOnline ? 1 : 0.3,
                    filter: isOnline ? 'none' : 'grayscale(100%)'
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Simple car illustration using SVG */}
                  <svg width="300" height="120" viewBox="0 0 300 120" fill="none">
                    <motion.path
                      d="M50 80 L90 80 L100 50 L120 40 L180 40 L190 50 L200 80 L250 80 L250 90 L230 90 L220 100 L210 100 L200 90 L100 90 L90 100 L80 100 L70 90 L50 90 Z"
                      stroke={isOnline ? "#00E5FF" : "#4B5563"}
                      strokeWidth="2"
                      fill="url(#carGradient)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut" }}
                    />
                    <circle cx="85" cy="100" r="12" fill="#1a2332" stroke={isOnline ? "#00E5FF" : "#4B5563"} strokeWidth="2" />
                    <circle cx="215" cy="100" r="12" fill="#1a2332" stroke={isOnline ? "#00E5FF" : "#4B5563"} strokeWidth="2" />
                    <rect x="130" y="45" width="30" height="20" fill={isOnline ? "#00E5FF" : "#4B5563"} opacity="0.3" />
                    <defs>
                      <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={isOnline ? "#00E5FF" : "#4B5563"} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={isOnline ? "#6C63FF" : "#374151"} stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Live data indicators */}
                  {isOnline && (
                    <>
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <div className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(0, 229, 255, 0.2)', color: '#00E5FF' }}>
                          {vehicle.speed.toFixed(0)} mph
                        </div>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricCard
                  icon={Battery}
                  label="Battery"
                  value={`${vehicle.battery.toFixed(0)}%`}
                  color={vehicle.battery > 60 ? '#00FF85' : vehicle.battery > 30 ? '#FFB800' : '#FF3D71'}
                  isOnline={isOnline}
                />
                <MetricCard
                  icon={Gauge}
                  label="Speed"
                  value={`${vehicle.speed.toFixed(0)} mph`}
                  color="#00E5FF"
                  isOnline={isOnline}
                />
                <MetricCard
                  icon={Thermometer}
                  label="Temperature"
                  value={`${vehicle.temperature.toFixed(0)}°C`}
                  color={vehicle.temperature > 50 ? '#FF3D71' : '#00E5FF'}
                  isOnline={isOnline}
                />
                <MetricCard
                  icon={Clock}
                  label="Last Update"
                  value={isOnline ? 'Just now' : '2m ago'}
                  color="#6C63FF"
                  isOnline={isOnline}
                />
              </div>
            </div>
          </motion.div>

          {/* Telemetry Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              className="p-6 rounded-xl border border-[#2a3542]"
              style={{ backgroundColor: '#121821' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-sm font-medium text-gray-400 mb-4">Battery Level (20min)</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={batteryHistory}>
                    <defs>
                      <linearGradient id="batteryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00FF85" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00FF85" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#6B7280" fontSize={10} />
                    <YAxis stroke="#6B7280" fontSize={10} />
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
                      dataKey="battery" 
                      stroke="#00FF85" 
                      fill="url(#batteryGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              className="p-6 rounded-xl border border-[#2a3542]"
              style={{ backgroundColor: '#121821' }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-sm font-medium text-gray-400 mb-4">Temperature (20min)</h3>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureHistory}>
                    <XAxis dataKey="time" stroke="#6B7280" fontSize={10} />
                    <YAxis stroke="#6B7280" fontSize={10} />
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
                      dataKey="temp" 
                      stroke="#FFB800" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Vehicle State & Events */}
        <div className="space-y-6">
          {/* Vehicle State Card */}
          <motion.div
            className="p-6 rounded-xl border border-[#2a3542]"
            style={{ backgroundColor: '#121821' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Vehicle State</h3>
            
            <div className="space-y-4">
              <StateItem
                icon={TrendingUp}
                label="Health Score"
                value={`${vehicle.healthScore}%`}
                color={vehicle.healthScore >= 80 ? '#00FF85' : vehicle.healthScore >= 60 ? '#FFB800' : '#FF3D71'}
              />
              <StateItem
                icon={Signal}
                label="Connection Quality"
                value={vehicle.connectionQuality}
                color={
                  vehicle.connectionQuality === 'excellent' ? '#00FF85' :
                  vehicle.connectionQuality === 'good' ? '#FFB800' : '#FF3D71'
                }
              />
              <StateItem
                icon={vehicle.otaEligible ? CheckCircle : AlertCircle}
                label="OTA Eligibility"
                value={vehicle.otaEligible ? 'Eligible' : 'Not Eligible'}
                color={vehicle.otaEligible ? '#00FF85' : '#9CA3AF'}
              />
            </div>
          </motion.div>

          {/* Recent Events */}
          <motion.div
            className="p-6 rounded-xl border border-[#2a3542]"
            style={{ backgroundColor: '#121821' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Events</h3>
            
            <div className="space-y-3">
              {vehicleEvents.length > 0 ? (
                vehicleEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    className="p-3 rounded-lg border border-[#2a3542]"
                    style={{ backgroundColor: '#0B0F14' }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-2">
                      <div 
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{ 
                          backgroundColor: event.severity === 'critical' ? '#FF3D71' : 
                                         event.severity === 'warning' ? '#FFB800' : '#00E5FF'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-300">{event.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {Math.floor((Date.now() - event.timestamp.getTime()) / 60000)}m ago
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No recent events</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  isOnline: boolean;
}

function MetricCard({ icon: Icon, label, value, color, isOnline }: MetricCardProps) {
  return (
    <motion.div
      className="p-4 rounded-lg border border-[#2a3542]"
      style={{ backgroundColor: '#0B0F14' }}
      animate={{ 
        borderColor: isOnline ? color + '40' : '#2a3542'
      }}
    >
      <Icon className="w-5 h-5 mb-2" style={{ color }} />
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <motion.div
        className="text-xl font-bold text-white"
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {value}
      </motion.div>
    </motion.div>
  );
}

interface StateItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}

function StateItem({ icon: Icon, label, value, color }: StateItemProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#0B0F14' }}>
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5" style={{ color }} />
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}
