// TODO: reservation type definition
type ReservationType = 'normal' | 'vip';

interface Reservation {
  name: string;
  type: ReservationType;
}

type HourlySchedule = {
  hour: number;
  reservations: Reservation[];
} | null

interface DailyTimeTableData {
  date: Dayjs;
  schedules: HourlySchedule[];
}

export {
  DailyTimeTableData,
  Reservation
}
