import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, AlertTriangle, Plus } from 'lucide-react';
import { mockCampaigns } from '../data/mockData';
import { OTACampaign } from '../types';

export function OTACampaignsPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  const handleStatusChange = (id: string, newStatus: OTACampaign['status']) => {
    setCampaigns(prev => 
      prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">OTA Campaign Manager</h1>
          <p className="text-gray-400">Orchestrate over-the-air updates across your fleet</p>
        </div>
        <motion.button
          className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 text-white"
          style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5" />
          New Campaign
        </motion.button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Running</div>
          <div className="text-2xl font-bold" style={{ color: '#00E5FF' }}>
            {campaigns.filter(c => c.status === 'running').length}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Paused</div>
          <div className="text-2xl font-bold" style={{ color: '#FFB800' }}>
            {campaigns.filter(c => c.status === 'paused').length}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Completed</div>
          <div className="text-2xl font-bold" style={{ color: '#00FF85' }}>
            {campaigns.filter(c => c.status === 'completed').length}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-[#2a3542]" style={{ backgroundColor: '#121821' }}>
          <div className="text-sm text-gray-400 mb-1">Rolled Back</div>
          <div className="text-2xl font-bold" style={{ color: '#FF3D71' }}>
            {campaigns.filter(c => c.status === 'rolled-back').length}
          </div>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              index={index}
              onStatusChange={handleStatusChange}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface CampaignCardProps {
  campaign: OTACampaign;
  index: number;
  onStatusChange: (id: string, status: OTACampaign['status']) => void;
}

function CampaignCard({ campaign, index, onStatusChange }: CampaignCardProps) {
  const statusConfig = {
    running: { color: '#00E5FF', icon: Clock, label: 'Running' },
    paused: { color: '#FFB800', icon: Pause, label: 'Paused' },
    completed: { color: '#00FF85', icon: CheckCircle, label: 'Completed' },
    'rolled-back': { color: '#FF3D71', icon: AlertTriangle, label: 'Rolled Back' },
  };

  const config = statusConfig[campaign.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      className="p-6 rounded-xl border border-[#2a3542] relative overflow-hidden"
      style={{ backgroundColor: '#121821' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        boxShadow: `0 0 30px ${config.color}30`,
        y: -4
      }}
    >
      {/* Background Gradient */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-20"
        style={{ background: config.color }}
      />

      {/* Header */}
      <div className="relative z-10 mb-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{campaign.name}</h3>
            <p className="text-sm text-gray-400">Version {campaign.version}</p>
          </div>
          <div 
            className="px-3 py-1 rounded-full flex items-center gap-2"
            style={{ backgroundColor: `${config.color}20` }}
          >
            <StatusIcon className="w-4 h-4" style={{ color: config.color }} />
            <span className="text-xs font-medium" style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{campaign.vehicles} vehicles</span>
          <span>•</span>
          <span>Target: {campaign.targetFleet}%</span>
          <span>•</span>
          <span>
            {Math.floor((Date.now() - campaign.startedAt.getTime()) / 3600000)}h ago
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="relative z-10 space-y-4">
        {/* Main Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Overall Progress</span>
            <span className="text-sm font-medium text-white">{campaign.progress}%</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#0B0F14' }}>
            <motion.div
              className="h-full"
              style={{ backgroundColor: config.color }}
              initial={{ width: 0 }}
              animate={{ width: `${campaign.progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Canary Progress (if applicable) */}
        {campaign.canaryProgress !== undefined && campaign.status === 'running' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Canary Rollout</span>
              <span className="text-sm font-medium text-white">{campaign.canaryProgress}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#0B0F14' }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: '#6C63FF' }}
                initial={{ width: 0 }}
                animate={{ width: `${campaign.canaryProgress}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              />
            </div>
          </div>
        )}

        {/* Rollback visualization */}
        {campaign.status === 'rolled-back' && (
          <motion.div
            className="p-3 rounded-lg border border-[#FF3D71]"
            style={{ backgroundColor: 'rgba(255, 61, 113, 0.05)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" style={{ color: '#FF3D71' }} />
              <span className="text-sm font-medium" style={{ color: '#FF3D71' }}>
                Campaign Rolled Back
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Update reverted on all vehicles. Canary phase showed critical issues.
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2">
          {campaign.status === 'running' && (
            <>
              <motion.button
                className="flex-1 px-4 py-2 rounded-lg border border-[#2a3542] text-sm font-medium text-gray-400 hover:text-white hover:border-[#FFB800] transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStatusChange(campaign.id, 'paused')}
              >
                <Pause className="w-4 h-4" />
                Pause
              </motion.button>
              <motion.button
                className="flex-1 px-4 py-2 rounded-lg border border-[#FF3D71] text-sm font-medium hover:bg-[#FF3D71] hover:text-white transition-colors flex items-center justify-center gap-2"
                style={{ color: '#FF3D71' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStatusChange(campaign.id, 'rolled-back')}
              >
                <RotateCcw className="w-4 h-4" />
                Rollback
              </motion.button>
            </>
          )}
          
          {campaign.status === 'paused' && (
            <motion.button
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStatusChange(campaign.id, 'running')}
            >
              <Play className="w-4 h-4" />
              Resume Campaign
            </motion.button>
          )}

          {campaign.status === 'completed' && (
            <div className="flex-1 px-4 py-2 rounded-lg border border-[#00FF85] text-sm font-medium text-center" style={{ color: '#00FF85' }}>
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Successfully Completed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
