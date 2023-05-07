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

export {weekLocaleMap}