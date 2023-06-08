import type { Dayjs } from 'dayjs';

const createDates = (startDate: Dayjs) => {
  const dates = [];
  let date = startDate;
  for (let offset = 0; offset < 7; offset += 1) {
    dates.push(date);
    date = date.add(1, 'day');
  }
  return dates;
};

const getWeekStartDateIncluded = (date: Dayjs) => {
  return date.subtract(date.day(), 'day');
}

export { createDates, getWeekStartDateIncluded };
