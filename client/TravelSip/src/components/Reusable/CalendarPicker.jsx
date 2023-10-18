import React, {useRef, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {COLORS} from '../../constants/theme';

const CalendarPicker = ({
  setOpenCalendar,
  selectedStartDate,
  setSelectedStartDate,
  selectedEndDate,
  setSelectedEndDate,
  selectedDates,
  setSelectedDates,
  singleday,
}) => {
  const todayRef = useRef(new Date());

  const onDayPress = day => {
    setOpenCalendar(false);
    if (!singleday) {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        const obj = {};
        obj[day.dateString] = {
          startingDay: true,
          color: COLORS.green,
          textColor: 'white',
        };
        setSelectedDates(obj);
      }
      if (selectedStartDate && !selectedEndDate) {
        const obj = {};
        let endDate = new Date(day.dateString);
        let currentDate = new Date(selectedStartDate);
        if (currentDate > endDate) {
          setSelectedEndDate(selectedStartDate);
          setSelectedStartDate(day.dateString);
          obj[selectedStartDate] = {
            endingDay: true,
            color: COLORS.green,
            textColor: 'white',
          };
          obj[day.dateString] = {
            startingDay: true,
            color: COLORS.green,
            textColor: 'white',
          };
          endDate = currentDate;
          currentDate = new Date(day.dateString);
        } else {
          obj[day.dateString] = {
            endingDay: true,
            color: COLORS.green,
            textColor: 'white',
          };
          setSelectedEndDate(day.dateString);
        }

        currentDate.setDate(currentDate.getDate() + 1);
        while (currentDate < endDate) {
          obj[currentDate.toISOString().split('T')[0]] = {
            color: COLORS.lightGreen,
            textColor: 'white',
          };
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setSelectedDates(prevDate => ({...prevDate, ...obj}));
      }
    } else {
      console.log(day);
    }
  };

  return (
    <Calendar
      minDate={todayRef.current.toISOString().split('T')[0]}
      markingType={'period'}
      markedDates={selectedDates}
      onDayPress={onDayPress}
    />
  );
};

export default CalendarPicker;
