import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { Battery, Thermometer, Activity, ExternalLink, Filter } from 'lucide-react';
import { mockVehicles } from '../data/mockData';
import { Vehicle } from '../types';

export function FleetPage() {
  const [vehicles] = useState(mockVehicles);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getHealthColor = (score: number) => {
    if (score >= 80) return '#00FF85';
    if (score >= 60) return '#FFB800';
    return '#FF3D71';
  };

  const getBatteryColor = (level: number) => {
    if (level >= 60) return '#00FF85';
    if (level >= 30) return '#FFB800';
    return '#FF3D71';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Vehicle Fleet</h1>
          <p className="text-gray-400">Monitor and manage all vehicles in your fleet</p>
        </div>
        <button className="px-4 py-2 rounded-lg border border-[#2a3542] text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Fleet Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Online Now</div>
          <div className="text-2xl font-bold text-white">{vehicles.filter(v => v.status === 'online').length}</div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Avg Battery</div>
          <div className="text-2xl font-bold text-white">
            {Math.round(vehicles.reduce((acc, v) => acc + v.battery, 0) / vehicles.length)}%
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">OTA Eligible</div>
          <div className="text-2xl font-bold text-white">{vehicles.filter(v => v.otaEligible).length}</div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Health Warnings</div>
          <div className="text-2xl font-bold text-white">{vehicles.filter(v => v.healthScore < 80).length}</div>
        </div>
      </div>

      {/* Fleet Table */}
      <motion.div
        className="rounded-xl border border-[#2a3542] overflow-hidden"
        style={{ backgroundColor: '#121821' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a3542]">
                <th className="text-left p-4 text-sm font-medium text-gray-400">Vehicle ID</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Vendor</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Battery</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Temperature</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Health Score</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">OTA</th>
                <th className="text-left p-4 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle, index) => (
                <motion.tr
                  key={vehicle.id}
                  className="border-b border-[#2a3542] hover:bg-[#1a2332] cursor-pointer transition-colors"
                  onClick={() => setExpandedRow(expandedRow === vehicle.id ? null : vehicle.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{vehicle.id}</div>
                    <div className="text-xs text-gray-500">{vehicle.location}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-white">{vehicle.vendor}</div>
                    <div className="text-xs text-gray-500">{vehicle.model}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Battery 
                        className="w-4 h-4" 
                        style={{ color: getBatteryColor(vehicle.battery) }}
                      />
                      <span className="text-white">{vehicle.battery}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Thermometer 
                        className="w-4 h-4" 
                        style={{ color: vehicle.temperature > 50 ? '#FF3D71' : '#00E5FF' }}
                      />
                      <span className="text-white">{vehicle.temperature}°C</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-12 h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: '#1a2332' }}
                      >
                        <div 
                          className="h-full transition-all"
                          style={{ 
                            width: `${vehicle.healthScore}%`,
                            backgroundColor: getHealthColor(vehicle.healthScore)
                          }}
                        />
                      </div>
                      <span className="text-white text-sm">{vehicle.healthScore}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: vehicle.status === 'online' 
                          ? 'rgba(0, 255, 133, 0.1)' 
                          : 'rgba(156, 163, 175, 0.1)',
                        color: vehicle.status === 'online' ? '#00FF85' : '#9CA3AF'
                      }}
                    >
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {vehicle.otaEligible ? (
                      <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(0, 229, 255, 0.1)', color: '#00E5FF' }}>
                        Eligible
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">Not Eligible</span>
                    )}
                  </td>
                  <td className="p-4">
                    <Link
                      to={`/digital-twin/${vehicle.id}`}
                      className="p-2 rounded-lg hover:bg-[#2a3542] transition-colors inline-flex items-center gap-1 text-sm"
                      style={{ color: '#00E5FF' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Twin
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
