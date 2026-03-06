import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: '#0B0F14' }}>
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <motion.div
            className="text-8xl font-bold mb-4"
            style={{ 
              background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <motion.button
              className="px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 text-white w-full sm:w-auto"
              style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #6C63FF 100%)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </motion.button>
          </Link>
          <motion.button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-[#2a3542] font-medium flex items-center justify-center gap-2 text-gray-400 hover:text-white hover:border-[#00E5FF] transition-colors w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
