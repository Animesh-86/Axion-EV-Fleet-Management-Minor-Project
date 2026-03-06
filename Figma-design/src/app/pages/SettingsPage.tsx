import { motion } from 'motion/react';
import { User, Bell, Lock, Database, Palette, Globe } from 'lucide-react';

export function SettingsPage() {
  const settingsSections = [
    {
      icon: User,
      title: 'Account Settings',
      description: 'Manage your profile, preferences, and account details',
      color: '#00E5FF'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alerts and notification preferences',
      color: '#6C63FF'
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Password, 2FA, and access control settings',
      color: '#00FF85'
    },
    {
      icon: Database,
      title: 'Data & Privacy',
      description: 'Manage data retention and privacy settings',
      color: '#FFB800'
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize dashboard theme and layout',
      color: '#FF3D71'
    },
    {
      icon: Globe,
      title: 'API & Integrations',
      description: 'Manage API keys and third-party integrations',
      color: '#00E5FF'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account and platform preferences</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <motion.button
            key={section.title}
            className="p-6 rounded-xl border border-[#2a3542] text-left hover:border-[#00E5FF] transition-colors"
            style={{ backgroundColor: '#121821' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
              style={{ backgroundColor: `${section.color}20` }}
            >
              <section.icon className="w-6 h-6" style={{ color: section.color }} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{section.title}</h3>
            <p className="text-sm text-gray-400">{section.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="p-6 rounded-xl border border-[#2a3542]"
        style={{ backgroundColor: '#121821' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg border border-[#2a3542] text-sm text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors">
            Export Fleet Data
          </button>
          <button className="px-4 py-2 rounded-lg border border-[#2a3542] text-sm text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors">
            Generate API Key
          </button>
          <button className="px-4 py-2 rounded-lg border border-[#2a3542] text-sm text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors">
            Download Reports
          </button>
          <button className="px-4 py-2 rounded-lg border border-[#2a3542] text-sm text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors">
            Invite Team Members
          </button>
        </div>
      </motion.div>
    </div>
  );
}
