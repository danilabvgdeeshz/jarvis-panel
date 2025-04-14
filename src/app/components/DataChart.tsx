'use client';
import { facebookService } from './facebookService';
import React, { useEffect, useState } from 'react';

interface DataChartProps {
  data?: {
    dates: string[];
    spend: number[];
    leads: number[];
  };
}

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const [glowAngle, setGlowAngle] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<{spend: number[], leads: number[]}>({
    spend: [],
    leads: []
  });

  // Демо-данные, если не переданы реальные
  const demoData = {
    dates: ['10/04', '11/04', '12/04', '13/04', '14/04', '15/04'],
    spend: [5.25, 8.75, 12.30, 15.80, 10.45, 26.44],
    leads: [2, 4, 8, 12, 6, 18]
  };

  const chartData = data || demoData;

  // Анимация для градиентного свечения
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Анимация для постепенного появления данных
  useEffect(() => {
    const finalSpend = chartData.spend;
    const finalLeads = chartData.leads;
    const steps = 20;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep <= steps) {
        const factor = currentStep / steps;
        setAnimatedValues({
          spend: finalSpend.map(value => value * factor),
          leads: finalLeads.map(value => Math.round(value * factor))
        });
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [chartData]);

  // Находим максимальные значения для масштабирования
  const maxSpend = Math.max(...chartData.spend) * 1.2;
  const maxLeads = Math.max(...chartData.leads) * 1.2;

  // Рассчитываем высоту для каждого бара
  const calculateHeight = (value: number, max: number) => {
    return (value / max) * 100;
  };

  // Вычисляем стоимость за лид
  const calculateCPL = (spend: number, leads: number) => {
    if (leads === 0) return 0;
    return spend / leads;
  };

  // Основной контейнер
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '300px',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    overflow: 'hidden',
    marginTop: '32px',
    marginBottom: '32px',
    border: '1px solid #333',
    boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
  };

  // Футуристический фон
  const backgroundGridStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(15, 15, 15, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 15, 15, 0.7) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    opacity: 0.2,
    zIndex: 0,
  };

  // Неоновое свечение для графика
  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '50%',
    background: `radial-gradient(circle at ${50 + 20 * Math.cos(glowAngle * Math.PI / 180)}% ${50 + 20 * Math.sin(glowAngle * Math.PI / 180)}%, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.05), transparent 70%)`,
    opacity: 0.8,
    zIndex: 1,
    filter: 'blur(30px)',
  };

  // Заголовок графика
  const titleStyle: React.CSSProperties = {
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    position: 'relative',
    zIndex: 2,
    background: 'linear-gradient(90deg, white, #9CA3AF)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Контейнер для баров графика
  const chartContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '180px',
    position: 'relative',
    zIndex: 2,
    marginTop: '20px',
  };

  // Стили для баров и оверлея
  const getBarGroupStyle = (index: number) => ({
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    width: `${90 / chartData.dates.length}%`,
    height: '100%',
    position: 'relative' as 'relative',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    transform: hoverIndex === index ? 'scale(1.05)' : 'scale(1)',
  });

  const getSpendBarStyle = (height: number) => ({
    width: '40%',
    height: `${height}%`,
    backgroundColor: 'rgba(16, 185, 129, 0.3)',
    borderTop: '2px solid #10B981',
    boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
    position: 'relative' as 'relative',
    transition: 'height 0.5s ease-out',
    zIndex: 3,
  });

  const getLeadsBarStyle = (height: number) => ({
    width: '40%',
    height: `${height}%`,
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderTop: '2px solid #3B82F6',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
    position: 'relative' as 'relative',
    transition: 'height 0.5s ease-out',
    zIndex: 3,
  });

  const dateStyle: React.CSSProperties = {
    color: '#9CA3AF',
    fontSize: '12px',
    marginTop: '8px',
    textAlign: 'center',
  };

  // Информационный тултип при наведении
  const tooltipStyle = (index: number): React.CSSProperties => ({
    position: 'absolute',
    top: '-70px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: `1px solid ${calculateCPL(chartData.spend[index], chartData.leads[index]) < 2 ? '#10B981' : '#EC4899'}`,
    borderRadius: '4px',
    padding: '8px',
    width: '140px',
    zIndex: 10,
    display: hoverIndex === index ? 'block' : 'none',
    boxShadow: `0 0 15px rgba(${calculateCPL(chartData.spend[index], chartData.leads[index]) < 2 ? '16, 185, 129' : '236, 72, 153'}, 0.3)`,
  });

  const tooltipRowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '3px 0',
    fontSize: '12px',
  };

  // Линии сетки
  const gridLinesStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  };

  // Создаем линии сетки
  const gridLines = [];
  for (let i = 0; i <= 4; i++) {
    const yPosition = 100 - (i * 25);
    gridLines.push(
      <div 
        key={`grid-line-${i}`} 
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${yPosition}%`,
          height: '1px',
          background: 'rgba(255, 255, 255, 0.1)',
          zIndex: 1,
        }}
      />
    );
  }

  // Декоративный элемент
  const decorativeCircleStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  const innerCircleStyle: React.CSSProperties = {
    width: '70%',
    height: '70%',
    borderRadius: '50%',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    fontSize: '10px',
    color: '#3B82F6',
  };

  // Цифровой код (для декора)
  const codeTextStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'monospace',
    zIndex: 2,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundGridStyle}></div>
      <div style={glowStyle}></div>
      <div style={gridLinesStyle}>{gridLines}</div>
      
      {/* Декоративные элементы */}
      <div style={decorativeCircleStyle}>
        <div style={innerCircleStyle}>DATA</div>
      </div>
      <div style={codeTextStyle}>SYS::XD-0{Math.floor(Math.random() * 9) + 1}</div>
      
      <h3 style={titleStyle}>ДИНАМИКА РАСХОДОВ И ЗАЯВОК</h3>
      
      <div style={chartContainerStyle}>
        {chartData.dates.map((date, index) => (
          <div 
            key={date} 
            style={getBarGroupStyle(index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Тултип */}
            <div style={tooltipStyle(index)}>
              <div style={tooltipRowStyle}>
                <span style={{ color: '#9CA3AF' }}>Дата:</span>
                <span style={{ color: 'white' }}>{date}</span>
              </div>
              <div style={tooltipRowStyle}>
                <span style={{ color: '#10B981' }}>Расход:</span>
                <span style={{ color: '#10B981' }}>${animatedValues.spend[index]?.toFixed(2) || '0.00'}</span>
              </div>
              <div style={tooltipRowStyle}>
                <span style={{ color: '#3B82F6' }}>Заявки:</span>
                <span style={{ color: '#3B82F6' }}>{animatedValues.leads[index] || 0}</span>
              </div>
              <div style={tooltipRowStyle}>
                <span style={{ color: '#EC4899' }}>CPL:</span>
                <span style={{ 
                  color: calculateCPL(animatedValues.spend[index] || 0, animatedValues.leads[index] || 1) < 2 ? '#10B981' : '#EC4899' 
                }}>
                  ${calculateCPL(animatedValues.spend[index] || 0, animatedValues.leads[index] || 1).toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Бары */}
            <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'flex-end', gap: '4px' }}>
              <div style={getSpendBarStyle(calculateHeight(animatedValues.spend[index] || 0, maxSpend))}>
                <div style={{ 
                  width: '100%', 
                  height: '5px', 
                  backgroundColor: '#10B981', 
                  opacity: 0.7, 
                  position: 'absolute', 
                  top: 0, 
                  left: 0 
                }}></div>
              </div>
              <div style={getLeadsBarStyle(calculateHeight(animatedValues.leads[index] || 0, maxLeads))}>
                <div style={{ 
                  width: '100%', 
                  height: '5px', 
                  backgroundColor: '#3B82F6', 
                  opacity: 0.7, 
                  position: 'absolute', 
                  top: 0, 
                  left: 0 
                }}></div>
              </div>
            </div>
            <div style={dateStyle}>{date}</div>
          </div>
        ))}
      </div>

      {/* Легенда */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '20px', zIndex: 3, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#10B981', marginRight: '6px', borderRadius: '2px' }}></div>
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Расход</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#3B82F6', marginRight: '6px', borderRadius: '2px' }}></div>
          <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Заявки</span>
        </div>
      </div>
    </div>
  );
};

export default DataChart;