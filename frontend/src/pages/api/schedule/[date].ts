import dayjs from 'dayjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { DailyTimeTableData } from './@types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DailyTimeTableData>
) {
  let { date } = req.query;
  
  if (Array.isArray(date)) {
    date = date[0];
  }

  if (!date || !dayjs(date).isValid()) {
    res.status(400).json({
      message: 'Invalid date.'
    });
    return;
  }

  const _mockupData: DailyTimeTableData = {
    schedules: [
      { hour: 9, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 10, reservations: [{ name: '민지원', type: 'vip' }] },
      { hour: 11, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 12, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 13, reservations: [{ name: '민지원', type: 'vip' }] },
      { hour: 14, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 15, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 16, reservations: [{ name: '민지원', type: 'vip' }] },
      { hour: 17, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 18, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 19, reservations: [{ name: '민지원', type: 'vip' }] },
      { hour: 20, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 21, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 22, reservations: [{ name: '민지원', type: 'normal' }] },
      { hour: 23, reservations: [{ name: '민지원', type: 'normal' }] },
    ],
  };

  res.status(200).json(_mockupData);
}
