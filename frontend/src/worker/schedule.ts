import request from './_request';
import type {DailyTimeTableData} from '@types'

export const fetchSchedule = async (date: string) => {
  const {data} = await request.get<DailyTimeTableData>(`/api/schedule/${date}`);
  return data;
} 