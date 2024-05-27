// src/NotificationComponent.js

import React, { useEffect } from 'react';
import schedule from 'node-schedule';

const NotificationComponent = ({ markedDates }) => {
  useEffect(() => {
    const checkNotificationTime = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const today = currentDate.toISOString().split('T')[0];

      if (hours === 19 && !markedDates.includes(today)) {
        new Notification('Reminder', { body: 'You have not clicked any date today!' });
      }
    };

    const job = schedule.scheduleJob('0 19 * * *', checkNotificationTime);

    return () => {
      job.cancel();
    };
  }, [markedDates]);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return null;
};

export default NotificationComponent;
