import WeekHeaderButton from './_components/WeekHeaderButton';
import styles from './WeekHeader.module.scss';

interface WeekName {
  en: string;
  ko: string;
}

interface WeekLocaleMap {
  sun: WeekName;
  mon: WeekName;
  tue: WeekName;
  wed: WeekName;
  thr: WeekName;
  fri: WeekName;
  sat: WeekName;
}

const weekLocaleMap: WeekLocaleMap = {
  sun: {
    en: 'Sun',
    ko: '일',
  },
  mon: {
    en: 'Mon',
    ko: '월',
  },
  tue: {
    en: 'Tue',
    ko: '화',
  },
  wed: {
    en: 'Wed',
    ko: '수',
  },
  thr: {
    en: 'Thr',
    ko: '목',
  },
  fri: {
    en: 'Fri',
    ko: '금',
  },
  sat: {
    en: 'Sat',
    ko: '토',
  },
};

interface WeekHeaderProps {}

export default function WeekHeader({}: WeekHeaderProps) {
  const weekdays = Object.values(weekLocaleMap).map(({ ko }) => ({
    title: ko,
    isHoliday: ko === '일',
  }));
  return (
    <div className={styles.weekHeader}>
      {weekdays.map((day) => (
        <WeekHeaderButton weekday={day} key={`week-${day}`} />
      ))}
    </div>
  );
}
