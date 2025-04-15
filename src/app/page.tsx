import React from 'react';
import Dashboard from './components/Dashboard';
import BackgroundGradient from './components/BackgroundGradient';

function HomePage() {
  const pageStyle = {
    backgroundColor: '#000',
    minHeight: '100vh',
    position: 'relative',
    width: '100%',
    padding: 0,
    margin: 0,
    overflow: 'hidden'
  };

  return (
    <main style={pageStyle}>
      <BackgroundGradient />
      <Dashboard />
    </main>
  );
}

export default HomePage;