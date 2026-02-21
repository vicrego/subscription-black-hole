
import React, { useState, useEffect } from 'react';
import { motion, type Transition } from 'framer-motion';
import './SolarSystem.css';


const Animation = () => {
  const [isPaused, setIsPaused] = useState(false);

  const pullTransition: Transition = {
    duration: isPaused ? 0.01 : 8,
    repeat: Infinity,
    ease: "easeIn",
  };
  
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


export default Animation


