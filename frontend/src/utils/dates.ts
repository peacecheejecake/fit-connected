import type { Dayjs } from 'dayjs';

const createDatesForWeek = (startDate: Dayjs) => {
  const dates = [];
  let date = startDate;
  for (let offset = 0; offset < 7; offset += 1) {
    dates.push(date);
    date = date.add(1, 'day');
  }
  return dates;
};

const createWeeksForMonth = (startDate: Dayjs) => {
  const month = startDate.month() + Number(startDate.date() > 1);

  const weeks = [];
  let _startDate = startDate;

  while (_startDate.month() <= month) {
    weeks.push(createDatesForWeek(_startDate));
    _startDate = _startDate.add(7, 'day');
  }

  return weeks;
};

const getWeekStartDateIncluded = (date: Dayjs) => {
  return date.subtract(date.day(), 'day');
};

export { createDatesForWeek, createWeeksForMonth, getWeekStartDateIncluded };
