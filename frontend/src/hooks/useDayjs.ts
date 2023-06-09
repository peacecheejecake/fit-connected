import dayjs from 'dayjs';
import type { Dayjs, ConfigType } from 'dayjs';
import { useState } from 'react';

const useDayjs = (
  date?: ConfigType
): [Dayjs, React.Dispatch<React.SetStateAction<Dayjs>>] => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(date));
  return [startDate, setStartDate];
};

const useWeekStartDayjs = (
  date?: ConfigType
): [Dayjs, React.Dispatch<React.SetStateAction<Dayjs>>] => {
  const _date = dayjs(date);
  const [startDate, setStartDate] = useState<Dayjs>(
    _date.subtract(_date.day(), 'day')
  );
  return [startDate, setStartDate];
};

export { useDayjs, useWeekStartDayjs };
