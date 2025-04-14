'use client';

import React from 'react';

const BackgroundGradient: React.FC = () => {
  const gradientStyle = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    overflow: 'hidden',
  };

  const glowStyle = {
    position: 'absolute' as 'absolute',
    top: '-100px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '600px',
    height: '600px',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: '50%',
    filter: 'blur(70px)',
    animation: 'pulse 4s infinite',
    pointerEvents: 'none' as 'none',
  };

  return (
    <div style={gradientStyle}>
      <div style={glowStyle}></div>
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default BackgroundGradient;