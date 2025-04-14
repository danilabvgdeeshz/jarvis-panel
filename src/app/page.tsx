import Dashboard from './components/Dashboard';
import BackgroundGradient from './components/BackgroundGradient';

export default function Home() {
  const pageStyle: React.CSSProperties = {
    backgroundColor: '#000',
    minHeight: '100vh',
    position: 'relative',
  };  

  return (
    <main style={pageStyle}>
      <BackgroundGradient />
      <Dashboard />
    </main>
  );
}