import { useState, useEffect } from 'react';
import type { Dayjs } from 'dayjs';
import { createDates } from './_worker';

const useWeekDates = (
  startDate: Dayjs,
  offset?: number
): [Dayjs[], React.Dispatch<React.SetStateAction<Dayjs[]>>] => {
  const [dates, setDates] = useState(createDates(startDate.add((offset ?? 0) * 7, 'day')));
  return [dates, setDates];
};

export { useWeekDates };
