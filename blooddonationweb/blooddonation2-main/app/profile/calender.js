// components/Calendar.js
import React from 'react';
import '../styles/navbar.css'
const Calendar = () => {
  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // getMonth() is zero-based
  const year = currentDate.getFullYear();
  const days = daysInMonth(month, year);
  const firstDay = new Date(year, month - 1, 1).getDay();

  const daysArray = [...Array(days).keys()].map(i => i + 1);
  const emptyDays = [...Array(firstDay).keys()];

  return (
    <div className="calender-box bg-red-50">
       <div className="calendar">
      <div className="calendar-header">
        {currentDate.toLocaleString('default', { month: 'long' })} {year}
      </div>
      <div className="calendar-grid">
        <div className="calendar-day">Sun</div>
        <div className="calendar-day">Mon</div>
        <div className="calendar-day">Tue</div>
        <div className="calendar-day">Wed</div>
        <div className="calendar-day">Thu</div>
        <div className="calendar-day">Fri</div>
        <div className="calendar-day">Sat</div>
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-empty"></div>
        ))}
        {daysArray.map(day => (
          <div key={day} className="calendar-date">
            {day}
          </div>
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default Calendar;
