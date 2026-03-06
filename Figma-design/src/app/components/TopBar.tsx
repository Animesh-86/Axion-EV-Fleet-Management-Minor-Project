import { useState } from 'react';
import { Search, ChevronDown, User, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function TopBar() {
  const [systemStatus] = useState<'live' | 'degraded'>('live');

  return (
    <div className="h-16 border-b border-[#1a2332] px-6 flex items-center justify-between" style={{ backgroundColor: '#121821' }}>
      {/* Left side - Fleet selector and search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <select className="bg-[#1a2332] text-white px-4 py-2 rounded-lg border border-[#2a3542] appearance-none pr-10 cursor-pointer hover:border-[#00E5FF] transition-colors">
            <option>All Fleets</option>
            <option>North America Fleet</option>
            <option>Europe Fleet</option>
            <option>APAC Fleet</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vehicles by ID, vendor, or location..."
            className="w-full bg-[#1a2332] text-white pl-10 pr-4 py-2 rounded-lg border border-[#2a3542] focus:border-[#00E5FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Right side - Status and user */}
      <div className="flex items-center gap-4">
        {/* System Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ 
            backgroundColor: systemStatus === 'live' ? 'rgba(0, 255, 133, 0.1)' : 'rgba(255, 184, 0, 0.1)',
          }}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div 
            className="w-2 h-2 rounded-full"
            style={{ 
              backgroundColor: systemStatus === 'live' ? '#00FF85' : '#FFB800',
              boxShadow: systemStatus === 'live' 
                ? '0 0 8px rgba(0, 255, 133, 0.6)' 
                : '0 0 8px rgba(255, 184, 0, 0.6)'
            }}
          />
          <span className="text-xs font-medium" style={{ color: systemStatus === 'live' ? '#00FF85' : '#FFB800' }}>
            {systemStatus.toUpperCase()}
          </span>
        </motion.div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-[#1a2332] transition-colors text-gray-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF3D71] rounded-full" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#1a2332]">
          <div className="text-right">
            <div className="text-sm text-white">Sarah Chen</div>
            <div className="text-xs text-gray-400">Fleet Operator</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#6C63FF] flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
