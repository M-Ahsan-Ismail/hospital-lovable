
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, X, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FollowUpNotificationProps {
  show: boolean;
  count: number;
  onDismiss: () => void;
}

const FollowUpNotification: React.FC<FollowUpNotificationProps> = ({
  show,
  count,
  onDismiss
}) => {
  const navigate = useNavigate();

  const handleViewFollowUps = () => {
    console.log('Navigating to today\'s patients');
    navigate('/patients?filter=today');
    onDismiss();
  };

  console.log('FollowUpNotification render:', { show, count });

  return (
    <AnimatePresence>
      {show && count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            duration: 0.5
          }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[60] bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-2xl border border-yellow-400/50 min-w-[350px] max-w-[400px]"
        >
          <div className="relative overflow-hidden rounded-xl">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
            
            {/* Glow effect */}
            <div className="absolute inset-0 shadow-[0_0_30px_rgba(255,193,7,0.6)] rounded-xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                    className="bg-white/20 rounded-full p-2 mr-3"
                  >
                    <Bell className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Follow-Up Alert!</h3>
                    <p className="text-white/90 text-sm">Today's appointments</p>
                  </div>
                </div>
                
                <button
                  onClick={onDismiss}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="bg-white/20 rounded-lg p-3 mr-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-white text-2xl font-bold">
                    {count} Patient{count !== 1 ? 's' : ''}
                  </div>
                  <div className="text-white/90 text-sm">
                    scheduled for follow-up today
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewFollowUps}
                  className="flex-1 bg-white text-orange-600 font-semibold py-2 px-4 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Users size={16} />
                  View Patients
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onDismiss}
                  className="bg-white/20 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
                >
                  Later
                </motion.button>
              </div>
            </div>
            
            {/* Pulse effect border */}
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
              className="absolute inset-0 border-2 border-yellow-300/50 rounded-xl pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FollowUpNotification;
