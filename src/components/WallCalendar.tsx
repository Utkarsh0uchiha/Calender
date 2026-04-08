import React, { useState, useEffect } from 'react';
import './WallCalendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays,
  isWithinInterval,
  isBefore
} from 'date-fns';

const HERO_BACKGROUNDS = [
  'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', // 0 Jan
  'linear-gradient(135deg, #be123c 0%, #fb7185 100%)', // 1 Feb
  'linear-gradient(135deg, #166534 0%, #4ade80 100%)', // 2 Mar
  'linear-gradient(135deg, #0f766e 0%, #2dd4bf 100%)', // 3 Apr
  'linear-gradient(135deg, #86198f 0%, #e879f9 100%)', // 4 May
  'linear-gradient(135deg, #b45309 0%, #fbbf24 100%)', // 5 Jun
  'linear-gradient(135deg, #0369a1 0%, #38bdf8 100%)', // 6 Jul
  'linear-gradient(135deg, #15803d 0%, #facc15 100%)', // 7 Aug
  'linear-gradient(135deg, #9a3412 0%, #f97316 100%)', // 8 Sep
  'linear-gradient(135deg, #3f2c73 0%, #8b5cf6 100%)', // 9 Oct
  'linear-gradient(135deg, #7c2d12 0%, #d97706 100%)', // 10 Nov
  'linear-gradient(135deg, #064e3b 0%, #10b981 100%)'  // 11 Dec
];

export default function WallCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('calendarNotes');
    return saved ? JSON.parse(saved) : {};
  });

  const monthKey = format(currentDate, 'yyyy-MM');

  useEffect(() => {
    localStorage.setItem('calendarNotes', JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(prev => ({ ...prev, [monthKey]: e.target.value }));
  };

  const handlePageTurn = (action: () => void) => {
    setIsFlipping(true);
    setTimeout(() => {
      action();
      setTimeout(() => setIsFlipping(false), 50);
    }, 300);
  };

  const nextMonth = () => handlePageTurn(() => setCurrentDate(addMonths(currentDate, 1)));
  const prevMonth = () => handlePageTurn(() => setCurrentDate(subMonths(currentDate, 1)));

  const onDateClick = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isBefore(day, startDate)) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn"><ChevronLeft /></button>
        <div className="month-year-display">
          <span className="year">{format(currentDate, 'yyyy')}</span>
          <span className="month">{format(currentDate, 'MMMM').toUpperCase()}</span>
        </div>
        <button onClick={nextMonth} className="nav-btn"><ChevronRight /></button>
      </div>
    );
  };

  const renderDays = () => {
    const defaultDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    return (
      <div className="days-row">
        {defaultDays.map((day, i) => (
          <div className="day-name" key={i} style={{ color: (i === 5 || i === 6) ? 'var(--primary-blue)' : 'inherit' }}>
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    // Setting ISO week starts on Monday
    const startDateGrid = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDateGrid = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDateGrid;
    let formattedDate = '';

    while (day <= endDateGrid) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelectedStart = startDate && isSameDay(day, startDate);
        const isSelectedEnd = endDate && isSameDay(day, endDate);
        const isBetween = startDate && endDate && isWithinInterval(day, { start: startDate, end: endDate });
        const isToday = isSameDay(day, new Date());
        const isWeekend = i === 5 || i === 6;

        let cellClass = "day-cell";
        if (!isCurrentMonth) cellClass += " disabled";
        else if (isSelectedStart) cellClass += " selected-start";
        else if (isSelectedEnd) cellClass += " selected-end";
        else if (isBetween) cellClass += " in-range";
        if (isToday) cellClass += " today";

        days.push(
          <div 
            className={`${cellClass} ${isWeekend ? 'weekend' : ''}`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="days-grid" key={day.toString()}>{days}</div>);
      days = [];
    }
    return <div className="cells-container">{rows}</div>;
  };

  const imageIndex = currentDate.getMonth();

  return (
    <div className="wall-calendar shadow-lg rounded-xl">
      <div className="spiral-binding">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="coil"></div>
        ))}
      </div>

      <div className={`calendar-inner ${isFlipping ? 'flipping' : ''}`}>
        <div className="hero-section" style={{ background: HERO_BACKGROUNDS[imageIndex] }}>
          <div className="hero-overlay">
            {renderHeader()}
          </div>
          <div className="hero-shape-bottom"></div>
        </div>
        
        <div className="calendar-body">
          <div className="notes-section">
            <h3 className="notes-title">Notes</h3>
            <div className="notes-editor-wrapper">
               <textarea 
                  className="notes-editor" 
                  value={notes[monthKey] || ''}
                  onChange={handleNoteChange}
                  placeholder="Write your memos for this month here..."
               />
               <div className="notes-lines"></div>
            </div>
          </div>
          
          <div className="grid-section">
            {renderDays()}
            {renderCells()}
          </div>
        </div>
      </div>
    </div>
  );
}
