'use client';
import { facebookService, type FacebookCampaign } from './facebookService';
import React, { useState, useEffect } from 'react';
import { Play, Pause, ArrowUp, ArrowDown, Plus, Minus, Gear } from '@phosphor-icons/react';

// Типы для таблицы кампаний
interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused';
  budget: number;
  spend: number;
  leads: number;
  cpl: number;
  created: string;
}

interface CampaignsTableProps {
  campaigns?: Campaign[];
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({ campaigns: propCampaigns }) => {
  // Демо-данные, если не переданы реальные
  const demoCampaigns: Campaign[] = [
    {
      id: 'cam_23x87a5',
      name: 'Ремонт квартир | Москва | 14.04',
      status: 'active',
      budget: 10.00,
      spend: 8.76,
      leads: 6,
      cpl: 1.46,
      created: '14/04/2025'
    },
    {
      id: 'cam_76b43c2',
      name: 'Доставка еды | Спб | 12.04',
      status: 'paused',
      budget: 15.00,
      spend: 12.25,
      leads: 9,
      cpl: 1.36,
      created: '12/04/2025'
    },
    {
      id: 'cam_45d98f1',
      name: 'IT-курсы | Москва | 10.04',
      status: 'active',
      budget: 20.00,
      spend: 5.43,
      leads: 3,
      cpl: 1.81,
      created: '10/04/2025'
    }
  ];

  const [campaigns, setCampaigns] = useState<Campaign[]>(propCampaigns || demoCampaigns);
  const [sortField, setSortField] = useState<keyof Campaign>('created');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [glowAngle, setGlowAngle] = useState(0);

  // Эффект для анимации фоновых эффектов
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAngle((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Сортировка кампаний
  const sortCampaigns = (field: keyof Campaign) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Применяем сортировку
  const sortedCampaigns = [...campaigns].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  // Управление статусом кампании
  const toggleCampaignStatus = (id: string) => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        return {
          ...campaign,
          status: campaign.status === 'active' ? 'paused' : 'active'
        };
      }
      return campaign;
    }));
  };

  // Изменение бюджета кампании
  const changeBudget = (id: string, change: 'increase' | 'decrease') => {
    setCampaigns(campaigns.map(campaign => {
      if (campaign.id === id) {
        const newBudget = change === 'increase' 
          ? Math.round((campaign.budget + 5) * 100) / 100
          : Math.max(5, Math.round((campaign.budget - 5) * 100) / 100);
        
        return {
          ...campaign,
          budget: newBudget
        };
      }
      return campaign;
    }));
  };

  // Стили
  const containerStyle: React.CSSProperties = {
    width: '100%',
    position: 'relative',
    backgroundColor: 'rgba(10, 10, 10, 0.8)',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '20px',
    overflow: 'hidden',
  };

  const backgroundGridStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(rgba(15, 15, 15, 0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 15, 15, 0.7) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    opacity: 0.1,
    zIndex: 0,
  };

  const glowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '200px',
    height: '200px',
    background: `radial-gradient(circle, rgba(59, 130, 246, 0.1), transparent 70%)`,
    opacity: 0.6,
    zIndex: 0,
    filter: 'blur(30px)',
  };

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
    display: 'flex',
    alignItems: 'center',
  };

  const decorativeCountStyle: React.CSSProperties = {
    marginLeft: '10px',
    fontSize: '14px',
    color: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(59, 130, 246, 0.3)',
  };

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px',
    position: 'relative',
    zIndex: 2,
  };

  const headerCellStyle = (field: keyof Campaign): React.CSSProperties => ({
    textAlign: field === 'name' ? 'left' : 'center',
    padding: '10px',
    color: '#9CA3AF',
    fontWeight: 'bold',
    fontSize: '12px',
    letterSpacing: '0.5px',
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  });

  const getSortIconStyle = (field: keyof Campaign): React.CSSProperties => ({
    marginLeft: '4px',
    opacity: sortField === field ? 1 : 0.3,
    transition: 'transform 0.2s ease',
    transform: sortField === field && sortDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0)',
    display: 'inline-block',
  });

  const rowStyle = (id: string): React.CSSProperties => ({
    backgroundColor: selectedCampaign === id 
      ? 'rgba(30, 30, 30, 0.9)' 
      : hoveredRow === id ? 'rgba(25, 25, 25, 0.9)' : 'rgba(20, 20, 20, 0.7)',
    transition: 'all 0.2s ease',
    transform: hoveredRow === id ? 'translateX(5px)' : 'translateX(0)',
    boxShadow: selectedCampaign === id 
      ? '0 0 15px rgba(59, 130, 246, 0.2)' 
      : hoveredRow === id ? '0 0 10px rgba(255, 255, 255, 0.1)' : 'none',
    borderLeft: selectedCampaign === id 
      ? '2px solid #3B82F6' 
      : '2px solid transparent',
  });

  const cellStyle = (align: 'left' | 'center' | 'right'): React.CSSProperties => ({
    padding: '12px 10px',
    fontSize: '13px',
    color: 'white',
    textAlign: align,
    borderTop: '1px solid rgba(255, 255, 255, 0.03)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.03)',
  });

  const firstCellStyle: React.CSSProperties = {
    ...cellStyle('left'),
    borderTopLeftRadius: '6px',
    borderBottomLeftRadius: '6px',
    paddingLeft: '15px',
  };

  const lastCellStyle: React.CSSProperties = {
    ...cellStyle('center'),
    borderTopRightRadius: '6px',
    borderBottomRightRadius: '6px',
  };

  const statusBadgeStyle = (status: 'active' | 'paused'): React.CSSProperties => ({
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    backgroundColor: status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(236, 72, 153, 0.2)',
    color: status === 'active' ? '#10B981' : '#EC4899',
    border: `1px solid ${status === 'active' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(236, 72, 153, 0.5)'}`,
  });

  const actionButtonStyle = (type: string, id: string): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    marginLeft: '5px',
    borderRadius: '4px',
    color: type === 'play' ? '#10B981' : type === 'pause' ? '#EC4899' : type === 'increase' ? '#3B82F6' : '#F59E0B',
    opacity: hoveredButton === `${type}-${id}` ? 1 : 0.7,
    backgroundColor: hoveredButton === `${type}-${id}` ? `rgba(${type === 'play' ? '16, 185, 129' : type === 'pause' ? '236, 72, 153' : type === 'increase' ? '59, 130, 246' : '245, 158, 11'}, 0.2)` : 'transparent',
    transition: 'all 0.2s ease',
  });

  const emptyMessageStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '30px',
    color: '#9CA3AF',
    fontSize: '14px',
    fontStyle: 'italic',
  };

  // Футуристический код для декора
  const codeTextStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    fontSize: '10px',
    color: 'rgba(255, 255, 255, 0.2)',
    fontFamily: 'monospace',
  };

  // CSS для анимаций
  const inlineStyles = `
    @keyframes pulse {
      0% { opacity: 0.7; }
      50% { opacity: 1; }
      100% { opacity: 0.7; }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{inlineStyles}</style>
      <div style={backgroundGridStyle}></div>
      <div style={glowStyle}></div>
      
      <h3 style={titleStyle}>
        АКТИВНЫЕ РЕКЛАМНЫЕ КАМПАНИИ
        <span style={decorativeCountStyle}>{campaigns.length}</span>
      </h3>
      
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle('name')} onClick={() => sortCampaigns('name')}>
              Название {sortField === 'name' && <span style={getSortIconStyle('name')}>▲</span>}
            </th>
            <th style={headerCellStyle('status')} onClick={() => sortCampaigns('status')}>
              Статус {sortField === 'status' && <span style={getSortIconStyle('status')}>▲</span>}
            </th>
            <th style={headerCellStyle('budget')} onClick={() => sortCampaigns('budget')}>
              Бюджет {sortField === 'budget' && <span style={getSortIconStyle('budget')}>▲</span>}
            </th>
            <th style={headerCellStyle('spend')} onClick={() => sortCampaigns('spend')}>
              Расход {sortField === 'spend' && <span style={getSortIconStyle('spend')}>▲</span>}
            </th>
            <th style={headerCellStyle('leads')} onClick={() => sortCampaigns('leads')}>
              Заявки {sortField === 'leads' && <span style={getSortIconStyle('leads')}>▲</span>}
            </th>
            <th style={headerCellStyle('cpl')} onClick={() => sortCampaigns('cpl')}>
              CPL {sortField === 'cpl' && <span style={getSortIconStyle('cpl')}>▲</span>}
            </th>
            <th style={headerCellStyle('created')} onClick={() => sortCampaigns('created')}>
              Дата {sortField === 'created' && <span style={getSortIconStyle('created')}>▲</span>}
            </th>
            <th style={{...headerCellStyle('id'), cursor: 'default'}}>
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCampaigns.length > 0 ? (
            sortedCampaigns.map(campaign => (
              <tr 
                key={campaign.id}
                style={rowStyle(campaign.id)}
                onMouseEnter={() => setHoveredRow(campaign.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => setSelectedCampaign(campaign.id === selectedCampaign ? null : campaign.id)}
              >
                <td style={firstCellStyle}>
                  {campaign.name}
                </td>
                <td style={cellStyle('center')}>
                  <span style={statusBadgeStyle(campaign.status)}>
                    {campaign.status === 'active' ? 'Активна' : 'Пауза'}
                  </span>
                </td>
                <td style={cellStyle('center')}>
                  ${campaign.budget.toFixed(2)}/день
                </td>
                <td style={cellStyle('center')}>
                  ${campaign.spend.toFixed(2)}
                </td>
                <td style={cellStyle('center')}>
                  {campaign.leads}
                </td>
                <td style={cellStyle('center')}>
                  <span style={{ 
                    color: campaign.cpl < 2 ? '#10B981' : campaign.cpl < 5 ? '#F59E0B' : '#EC4899',
                    fontWeight: 'bold'
                  }}>
                    ${campaign.cpl.toFixed(2)}
                  </span>
                </td>
                <td style={cellStyle('center')}>
                  {campaign.created}
                </td>
                <td style={lastCellStyle}>
                  {/* Кнопки управления */}
                  {campaign.status === 'active' ? (
                    <button 
                      style={actionButtonStyle('pause', campaign.id)}
                      onMouseEnter={() => setHoveredButton(`pause-${campaign.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCampaignStatus(campaign.id);
                      }}
                      title="Поставить на паузу"
                    >
                      <Pause size={16} weight="fill" />
                    </button>
                  ) : (
                    <button 
                      style={actionButtonStyle('play', campaign.id)}
                      onMouseEnter={() => setHoveredButton(`play-${campaign.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCampaignStatus(campaign.id);
                      }}
                      title="Запустить"
                    >
                      <Play size={16} weight="fill" />
                    </button>
                  )}
                  
                  <button 
                    style={actionButtonStyle('increase', campaign.id)}
                    onMouseEnter={() => setHoveredButton(`increase-${campaign.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeBudget(campaign.id, 'increase');
                    }}
                    title="Увеличить бюджет"
                  >
                    <Plus size={16} weight="fill" />
                  </button>
                  
                  <button 
                    style={actionButtonStyle('decrease', campaign.id)}
                    onMouseEnter={() => setHoveredButton(`decrease-${campaign.id}`)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      changeBudget(campaign.id, 'decrease');
                    }}
                    title="Уменьшить бюджет"
                  >
                    <Minus size={16} weight="fill" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} style={emptyMessageStyle}>
                Нет активных кампаний
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div style={codeTextStyle}>REC.SYS-{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</div>
    </div>
  );
};

export default CampaignsTable;