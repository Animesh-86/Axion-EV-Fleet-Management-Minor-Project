import { Link, useLocation } from 'react-router';
import { 
  LayoutDashboard, 
  Truck, 
  Boxes, 
  Upload, 
  BarChart3, 
  FlaskConical, 
  Settings,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/fleet', label: 'Fleet', icon: Truck },
  { path: '/digital-twin', label: 'Digital Twin', icon: Boxes },
  { path: '/ota-campaigns', label: 'OTA Campaigns', icon: Upload },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/simulator', label: 'Simulator', icon: FlaskConical },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r border-[#1a2332] flex flex-col" style={{ backgroundColor: '#121821' }}>
      {/* Logo */}
      <div className="p-6 border-b border-[#1a2332]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)' }}>
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Axion</h1>
            <p className="text-xs text-gray-400">Fleet Command</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative"
            >
              <motion.div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-[#1a2332]'
                }`}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(108, 99, 255, 0.1) 100%)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" style={isActive ? { color: '#00E5FF' } : {}} />
                <span className="relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#1a2332]">
        <div className="text-xs text-gray-500 text-center">
          Axion Platform v2.4.1
        </div>
      </div>
    </div>
  );
}
