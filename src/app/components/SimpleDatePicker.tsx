'use client';

import React, { useState } from 'react';

interface DatePickerProps {
  onClose: () => void;
  onDateSelected: (date: string) => void;
}

const SimpleDatePicker: React.FC<DatePickerProps> = ({ onClose, onDateSelected }) => {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const containerStyle = {
    position: 'absolute' as 'absolute',
    top: '100%',
    left: '0',
    backgroundColor: '#111',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '16px',
    zIndex: 10,
    marginTop: '8px',
    width: '300px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    color: '#9CA3AF',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '4px 0 12px',
    backgroundColor: '#222',
    border: '1px solid #444',
    borderRadius: '4px',
    color: 'white',
  };

  const buttonsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '12px',
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold' as 'bold',
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#374151',
    color: 'white',
  };

  const applyButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#10B981',
    color: 'white',
  };

  const todayButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#3B82F6',
    color: 'white',
  };

  const handleApply = () => {
    const formattedStartDate = formatToRussianDate(startDate);
    const formattedEndDate = formatToRussianDate(endDate);

    if (startDate === endDate) {
      onDateSelected(formattedStartDate);
    } else {
      onDateSelected(`${formattedStartDate} - ${formattedEndDate}`);
    }
    onClose();
  };

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    onDateSelected(formatToRussianDate(today));
    onClose();
  };

  // Преобразование ISO даты (YYYY-MM-DD) в русский формат (DD/MM/YYYY)
  const formatToRussianDate = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={containerStyle}>
      <div>
        <label style={labelStyle}>Начало периода:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label style={labelStyle}>Конец периода:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={buttonsContainerStyle}>
        <button style={todayButtonStyle} onClick={handleToday}>
          Сегодня
        </button>
        <div>
          <button style={cancelButtonStyle} onClick={onClose} title="Отмена">
            Отмена
          </button>
          <button
            style={{ ...applyButtonStyle, marginLeft: '8px' }}
            onClick={handleApply}
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleDatePicker;