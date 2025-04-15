'use client';
import React from 'react';
import Dashboard from '../app/components/Dashboard';
import BackgroundGradient from '../app/components/BackgroundGradient';

export default function HomePage() {
  const pageStyle = {
    backgroundColor: 'black',
    minHeight: '100vh',
    position: 'relative' as 'relative',
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