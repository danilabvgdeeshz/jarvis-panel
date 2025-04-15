import Dashboard from './components/Dashboard';
import BackgroundGradient from './components/BackgroundGradient';

function Page() {
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

Page.displayName = 'HomePage'; // можно оставить, можно удалить

export default Page; // ОБЯЗАТЕЛЬНО!
