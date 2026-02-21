
import React from 'react';
import { motion } from 'framer-motion';
import './SolarSystem.css';

export const Animation = () => {
  // A Fibonacci-style spiral uses the formula: r = a * e^(b * angle)
  // We'll simulate this by animating 'scale' and 'rotate' simultaneously
  
  return (
    <div className="space-container">
      {/* THE BLACK HOLE */}
      <div className="black-hole">
        <div className="event-horizon"></div>
      </div>

      {/* THE CHARACTER / TRANSACTION */}
      <motion.div
        className="character-wrapper"
        animate={{ 
          rotate: [0, 1440], // Multiple full rotations
          scale: [1, 0],     // Shrinks as it hits the center
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeIn" // Gets faster as it gets closer
        }}
      >
        <div className="character">
          👨‍🚀
          <span className="cost-tag">-$14.99</span>
        </div>
      </motion.div>
    </div>
  );
};