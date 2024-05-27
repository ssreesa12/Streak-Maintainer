// src/CalendarComponent.js

import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const CalendarComponent = ({ markedDates, onDateClick }) => {
  return (
    <div className="calendar-container">
      <Calendar
        onClickDay={onDateClick}
        tileContent={({ date, view }) =>
          view === 'month' && markedDates.includes(date.toISOString().split('T')[0]) ? (
            <span className="star">⭐</span>
          ) : null
        }
      />
    </div>
  );
};

export default CalendarComponent;
