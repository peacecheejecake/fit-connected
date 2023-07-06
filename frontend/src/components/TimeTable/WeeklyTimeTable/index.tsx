// import { useMemo } from 'react';
// import cx from 'classnames'
// import type { Dispatch, SetStateAction } from 'react';
// import type { Dayjs } from 'dayjs';
// import { createDatesForWeek } from '@/utils';
// import { useDayjs, useSwiper } from '@/hooks';
// import type { Direction } from '@/hooks';
// import { TimeBlock } from '../DailyTimeTable/_components';
// import styles from './WeeklyTimeTable.module.scss';

// interface WeeklyTimeTableProps {
//   startDate: Dayjs;
//   setStartDate: Dispatch<SetStateAction<Dayjs>>;
// }

// export default function WeeklyTimeTable({
//   startDate,
//   setStartDate,
// }: WeeklyTimeTableProps) {
//   const [selectedDate, setSelectedDate] = useDayjs(startDate);

//   const lastWeekDates = useMemo(
//     () => createDatesForWeek(startDate.subtract(7, 'day')),
//     [startDate]
//   );
//   const thisWeekDates = useMemo(() => createDatesForWeek(startDate), [startDate]);
//   const nextWeekDates = useMemo(
//     () => createDatesForWeek(startDate.add(7, 'day')),
//     [startDate]
//   );

//   const go = (direction: Direction) => {
//     if (!direction) return;

//     const sign = direction === 'prev' ? -1 : 1;
//     const changeOneWeek = (prev: Dayjs) => prev.add(sign * 7, 'day');

//     setStartDate(changeOneWeek);
//     setSelectedDate(changeOneWeek);
//   };

//   const { swiperTarget, direction } = useSwiper<HTMLDivElement>({ handler: go });

//   return (<div className={styles.weeklyTable}></div>);
// }
