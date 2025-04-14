'use client';

import React, { useState, useEffect } from 'react';
import { Lightning, ChartBar, ChatCircle, CalendarBlank, Rocket } from "@phosphor-icons/react";
import CampaignsTable from './CampaignsTable';
import DataChart from './DataChart';

// Остальной код...

const Dashboard: React.FC = () => {
  const [displayDate, setDisplayDate] = useState("14/04/2025");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [isSelectingEndDate, setIsSelectingEndDate] = useState<boolean>(false);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [glowAngle, setGlowAngle] = useState(0);

  // Анимация свечения
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Глобальные стили для контейнера
  const containerStyle = {
    padding: '16px',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'SoyuzGrotesk, system-ui, sans-serif',
    position: 'relative' as 'relative',
    overflowX: 'hidden' as 'hidden',
    minHeight: '100vh',
  };

  // Неоновый градиентный фон
  const backgroundGlowStyle = {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    opacity: '0.05',
    background: `radial-gradient(circle at ${50 + 20 * Math.cos(glowAngle * Math.PI / 180)}% ${50 + 20 * Math.sin(glowAngle * Math.PI / 180)}%, rgba(16, 185, 129, 0.8), rgba(59, 130, 246, 0.6), rgba(236, 72, 153, 0.7), transparent 70%)`,
    zIndex: '-1',
  };

  // Стиль для футуристической сетки
  const gridOverlayStyle = {
    position: 'absolute' as 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'linear-gradient(rgba(15, 15, 15, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 15, 15, 0.7) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    opacity: '0.1',
    zIndex: '-1',
  };

  // Стиль для выбора даты
  const datePickerContainerStyle = {
    position: 'relative' as 'relative',
    marginBottom: '16px',
    zIndex: '10',
  };

  // Футуристический инпут для даты
  const datePickerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: 'rgba(20, 20, 20, 0.7)',
    border: '1px solid #333',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 0 10px rgba(240, 240, 240, 0.1)',
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
  };

  // Анимированный заголовок
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '28px',
    position: 'relative' as 'relative',
  };

  const headerTextStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  };

  // Ракета с анимацией
  const rocketIconStyle = {
    marginRight: '10px',
    filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))',
    animation: 'pulse 2s infinite alternate',
  };

  // Карточки с неоновыми границами
  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  };

  // Киберпанк-стиль для карточек с неоновым свечением
  const cardBaseStyle = {
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    backdropFilter: 'blur(5px)',
    transition: 'all 0.3s ease',
    position: 'relative' as 'relative',
    overflow: 'hidden' as 'hidden',
  };

  // Бюджет
  const budgetCardStyle = {
    ...cardBaseStyle,
    border: '1px solid #10B981',
    boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)',
  };

  // Заявки
  const leadsCardStyle = {
    ...cardBaseStyle,
    border: '1px solid #3B82F6',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)',
  };

  // Цена за заявку
  const cplCardStyle = {
    ...cardBaseStyle,
    border: '1px solid #EC4899',
    boxShadow: '0 0 15px rgba(236, 72, 153, 0.3)',
  };

  // Заголовки карточек с иконками
  const cardTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  };

  // Футуристические цифры
  const budgetValueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#10B981',
    textShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
  };

  const leadsValueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#3B82F6',
    textShadow: '0 0 8px rgba(59, 130, 246, 0.5)',
  };

  const cplValueStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#EC4899',
    textShadow: '0 0 8px rgba(236, 72, 153, 0.5)',
  };

  // Футуристический контейнер для кампаний
  const campaignsContainerStyle = {
    padding: '20px',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    borderRadius: '8px',
    border: '1px solid #333',
    marginTop: '24px',
    boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
    position: 'relative' as 'relative',
    overflow: 'hidden' as 'hidden',
  };

  // Диагональная линия для контейнера кампаний
  const campaignsDiagonalLineStyle = {
    position: 'absolute' as 'absolute',
    top: '0',
    right: '0',
    width: '100px',
    height: '100px',
    background: 'linear-gradient(135deg, transparent 45%, rgba(59, 130, 246, 0.5) 55%, transparent 65%)',
    opacity: '0.3',
  };

  // Стили для календаря
  const calendarContainerStyle = {
    position: 'absolute' as 'absolute', 
    top: '100%',
    left: '0',
    backgroundColor: 'rgba(15, 15, 15, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '20px',
    marginTop: '8px',
    width: '360px',
    zIndex: '50',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 15px rgba(59, 130, 246, 0.3)',
  };

  const calendarHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '12px',
  };

  const monthSelectorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const monthNameStyle = {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#F0F0F0',
  };

  const navButtonStyle = {
    border: 'none',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    color: '#3B82F6',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  };

  const daysGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
  };

  const dayHeaderStyle = {
    textAlign: 'center' as 'center',
    fontWeight: 'bold',
    padding: '8px 4px',
    fontSize: '12px',
    color: '#9CA3AF',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  };

  const dayStyle = (isToday: boolean, isSelected: boolean, isInRange: boolean, isSelectable: boolean, isHovered: boolean) => ({
    textAlign: 'center' as 'center',
    padding: '8px 4px',
    borderRadius: '4px',
    cursor: isSelectable ? 'pointer' : 'default',
    backgroundColor: isSelected 
      ? 'rgba(59, 130, 246, 0.8)'
      : isInRange 
        ? 'rgba(59, 130, 246, 0.2)' 
        : isHovered && isSelectable
          ? 'rgba(255, 255, 255, 0.05)'
          : 'transparent',
    color: isSelectable 
      ? (isToday ? '#F59E0B' : 'white')
      : '#4B5563',
    fontWeight: isToday ? 'bold' : 'normal',
    border: isToday && !isSelected ? '1px solid #F59E0B' : 'none',
    opacity: isSelectable ? 1 : 0.5,
    transition: 'all 0.15s ease',
    transform: isHovered && isSelectable ? 'scale(1.1)' : 'scale(1)',
    boxShadow: isSelected ? '0 0 8px rgba(59, 130, 246, 0.5)' : 'none',
  });

  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '16px',
  };

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold' as 'bold',
    transition: 'all 0.2s ease',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(55, 65, 81, 0.7)',
    color: 'white',
  };

  const applyButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    color: 'white',
    boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
  };

  const todayButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(59, 130, 246, 0.8)',
    color: 'white',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
  };

  // Функции для календаря
  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay() || 7; // 0 воскресенье -> 7
  };

  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const formatDate = (date: Date): string => {
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isDateInRange = (date: Date): boolean => {
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const handleDateClick = (day: number): void => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    
    if (!isSelectingEndDate) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(clickedDate);
      setIsSelectingEndDate(true);
    } else {
      if (clickedDate < selectedStartDate) {
        setSelectedStartDate(clickedDate);
      } else {
        setSelectedEndDate(clickedDate);
        setIsSelectingEndDate(false);
      }
    }
  };

  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleApply = (): void => {
    if (isSameDay(selectedStartDate, selectedEndDate)) {
      setDisplayDate(formatDate(selectedStartDate));
    } else {
      setDisplayDate(`${formatDate(selectedStartDate)} - ${formatDate(selectedEndDate)}`);
    }
    setIsDatePickerOpen(false);
  };

  const handleToday = (): void => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedStartDate(today);
    setSelectedEndDate(today);
    setDisplayDate(formatDate(today));
    setIsDatePickerOpen(false);
  };

  // Рендер календаря
  const renderCalendar = (): React.ReactNode => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // День недели
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`header-${i}`} style={dayHeaderStyle}>
          {dayNames[i]}
        </div>
      );
    }
    
    // Пустые ячейки до первого дня месяца
    for (let i = 1; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={dayStyle(false, false, false, false, false)}></div>);
    }
    
    // Дни месяца
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = isSameDay(date, new Date());
      const isStartDate = isSameDay(date, selectedStartDate);
      const isEndDate = isSameDay(date, selectedEndDate);
      const isSelected = isStartDate || isEndDate;
      const isInRange = isDateInRange(date) && !isSelected;
      const isHovered = hoveredDay === day;
      
      days.push(
        <div 
          key={`day-${day}`} 
          style={dayStyle(isToday, isSelected, isInRange, true, isHovered)}
          onClick={() => handleDateClick(day)}
          onMouseEnter={() => setHoveredDay(day)}
          onMouseLeave={() => setHoveredDay(null)}
        >
          {day}
        </div>
      );
    }
    
    return (
      <div style={calendarContainerStyle}>
        <div style={calendarHeaderStyle}>
          <div style={monthSelectorStyle}>
            <span style={monthNameStyle}>
              {months[currentMonth]} {currentYear}
            </span>
          </div>
          <div>
            <button 
              style={{...navButtonStyle, marginRight: '8px'}} 
              onClick={handlePrevMonth}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
            >
              &lt;
            </button>
            <button 
              style={navButtonStyle} 
              onClick={handleNextMonth}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.2)'}
            >
              &gt;
            </button>
          </div>
        </div>
        <div style={daysGridStyle}>
          {days}
        </div>
        <div style={buttonsContainerStyle}>
          <button 
            style={todayButtonStyle} 
            onClick={handleToday}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 10px rgba(59, 130, 246, 0.3)'}
          >
            Сегодня
          </button>
          <div>
            <button 
              style={cancelButtonStyle} 
              onClick={() => setIsDatePickerOpen(false)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.9)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(55, 65, 81, 0.7)'}
            >
              Отмена
            </button>
            <button 
              style={{ ...applyButtonStyle, marginLeft: '8px' }} 
              onClick={handleApply}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)'}
            >
              Применить
            </button>
          </div>
        </div>
      </div>
    );
  };

  // CSS для анимации
  const inlineStyles = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes glow {
      0% { opacity: 0.8; }
      50% { opacity: 1; }
      100% { opacity: 0.8; }
    }
    
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
      100% { transform: translateY(0px); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{inlineStyles}</style>
      
      {/* Анимированный фон */}
      <div style={backgroundGlowStyle}></div>
      <div style={gridOverlayStyle}></div>
      
      {/* Выбор даты */}
      <div>
        <h2 style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#F59E0B' }}>Выбери дату 👇</h2>
        <div style={datePickerContainerStyle}>
          <div 
            style={datePickerStyle} 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(240, 240, 240, 0.2)';
              e.currentTarget.style.backgroundColor = 'rgba(30, 30, 30, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 10px rgba(240, 240, 240, 0.1)';
              e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.7)';
            }}
          >
            <CalendarBlank size={18} weight="fill" color="#F59E0B" style={{ marginRight: '8px' }} />
            {displayDate}
          </div>
          
          {isDatePickerOpen && renderCalendar()}
        </div>
      </div>

      {/* Заголовок */}
      <div style={headerStyle}>
        <div style={rocketIconStyle}>
          <Rocket size={36} weight="fill" color="#EC4899" />
        </div>
        <h1 style={headerTextStyle}>
          <span style={{ color: 'white' }}>jarvis </span>
          <span style={{ 
            color: '#10B981', 
            background: 'linear-gradient(90deg, #10B981, #3B82F6)', 
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>панель</span>
        </h1>
      </div>

      {/* Блоки с метриками */}
      <div style={cardsContainerStyle}>
        {/* Бюджет */}
        <div 
          style={budgetCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.3)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)',
            borderRadius: '50%',
          }}></div>
          <div style={cardTitleStyle}>
            <Lightning size={24} weight="fill" color="#10B981" style={{ marginRight: '8px' }} />
            <span style={{ color: '#9CA3AF' }}>откручено бюджета</span>
          </div>
          <div style={budgetValueStyle}>$26.44</div>
        </div>

        {/* Заявки */}
        <div 
          style={leadsCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.3)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15), transparent 70%)',
            borderRadius: '50%',
          }}></div>
          <div style={cardTitleStyle}>
            <ChartBar size={24} weight="fill" color="#3B82F6" style={{ marginRight: '8px' }} />
            <span style={{ color: '#9CA3AF' }}>заявки</span>
          </div>
          <div style={leadsValueStyle}>18</div>
        </div>

        {/* Цена за заявку */}
        <div 
          style={cplCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(236, 72, 153, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(236, 72, 153, 0.3)';
          }}
        >
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15), transparent 70%)',
            borderRadius: '50%',
          }}></div>
          <div style={cardTitleStyle}>
            <ChatCircle size={24} weight="fill" color="#EC4899" style={{ marginRight: '8px' }} />
            <span style={{ color: '#9CA3AF' }}>~ цена за заявку</span>
          </div>
          <div style={cplValueStyle}>$1.47</div>
        </div>
      </div>

      {/* Активные кампании */}
      <div style={campaignsContainerStyle}>
        <div style={campaignsDiagonalLineStyle}></div>
        <h2 style={{ 
          marginBottom: '12px', 
          fontWeight: 'bold', 
          background: 'linear-gradient(90deg, white, #9CA3AF)', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '20px'
        }}>
          {/* График данных */}
<DataChart />
<CampaignsTable />
          Активные рекламные кампании
        </h2>
        <p style={{ color: '#9CA3AF' }}>В разработке...</p>
        
        {/* Дополнительная линия для футуристического вида */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          marginTop: '12px',
        }}></div>
      </div>
    </div>
  );
};

export default Dashboard;