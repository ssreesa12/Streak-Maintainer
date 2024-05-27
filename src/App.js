// src/App.js

import React, { useState, useEffect } from 'react';
import CalendarComponent from './components/CalendarComponent';
import NotificationComponent from './components/notification';
import './App.css';

const App = () => {
  const [markedDates, setMarkedDates] = useState(() => {
    // Load marked dates from local storage
    const savedDates = localStorage.getItem('markedDates');
    return savedDates ? JSON.parse(savedDates) : [];
  });

  const calculateLongestStreak = (dates) => {
    if (dates.length === 0) return 0;

    // Sort the dates
    const sortedDates = dates.map(date => new Date(date)).sort((a, b) => a - b);
    let currentStreak = 1;
    let longestStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = sortedDates[i - 1];
      const currentDate = sortedDates[i];
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, currentStreak);
    return longestStreak;
  };

  const calculateCurrentStreak = (dates) => {
    if (dates.length === 0) return 0;

    // Sort the dates
    const sortedDates = dates.map(date => new Date(date)).sort((a, b) => a - b);
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = sortedDates[i - 1];
      const currentDate = sortedDates[i];
      const diffTime = Math.abs(currentDate - prevDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
    }

    return currentStreak;
  };

  const [longestStreak, setLongestStreak] = useState(() => {
    // Load longest streak count from local storage
    const savedLongestStreak = localStorage.getItem('longestStreak');
    return savedLongestStreak ? parseInt(savedLongestStreak) : 0;
  });

  const [currentStreak, setCurrentStreak] = useState(() => {
    // Load current streak count from local storage
    const savedCurrentStreak = localStorage.getItem('currentStreak');
    return savedCurrentStreak ? parseInt(savedCurrentStreak) : 0;
  });

  useEffect(() => {
    // Save marked dates to local storage
    localStorage.setItem('markedDates', JSON.stringify(markedDates));
    // Save longest streak to local storage
    localStorage.setItem('longestStreak', longestStreak.toString());
    // Save current streak to local storage
    localStorage.setItem('currentStreak', currentStreak.toString());
  }, [markedDates, longestStreak, currentStreak]);

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    let newMarkedDates;
    if (markedDates.includes(formattedDate)) {
      // Remove the date from markedDates
      newMarkedDates = markedDates.filter(d => d !== formattedDate);
    } else {
      // Add the date to markedDates
      newMarkedDates = [...markedDates, formattedDate];
    }
    setMarkedDates(newMarkedDates);
    
    const newLongestStreak = calculateLongestStreak(newMarkedDates);
    setLongestStreak(newLongestStreak);
    
    const newCurrentStreak = calculateCurrentStreak(newMarkedDates);
    setCurrentStreak(newCurrentStreak);
  };

  return (
    <div className="App">
      <h1>Calendar Streak App</h1>
      <CalendarComponent markedDates={markedDates} onDateClick={handleDateClick} />
      <NotificationComponent markedDates={markedDates} />
      <div className="streak-info">
        <h2>Longest Streak: {longestStreak} {longestStreak === 1 ? 'day' : 'days'}</h2>
        <h2>Current Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}</h2>
      </div>
    </div>
  );
};

export default App;
