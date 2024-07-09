import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

import { ReadingChallengeType } from "@prisma/client";
const getEndOfWeek = (date: dayjs.Dayjs): dayjs.Dayjs => {
  let endDate = dayjs(date).endOf("week");
  return endDate.set("day", endDate.get("day") - 1);
};

const getEndOfMonth = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).endOf("month");
};

const getEndOfYear = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return dayjs(date).endOf("year");
};

export const getEndDate = (date: Date, type: ReadingChallengeType): string => {
  if (type === ReadingChallengeType.WEEKLY) {
    return getEndOfWeek(dayjs(date)).toISOString();
  } else if (type === ReadingChallengeType.MONTHLY) {
    return getEndOfMonth(dayjs(date)).toISOString();
  } else {
    return getEndOfYear(dayjs(date)).toISOString();
  }
};

const getWeekOfYear = (date: Date): number => {
  return dayjs(date).week();
};

const getMonthOfYear = (date: Date): number => {
  return dayjs(date).month() + 1;
};

const getYear = (date: Date): number => {
  return dayjs(date).year();
};

export const getTimeframe = (
  startDate: Date,
  type: ReadingChallengeType
): string => {
  if (type === ReadingChallengeType.WEEKLY) {
    return `week ${getWeekOfYear(startDate)}`;
  } else if (type === ReadingChallengeType.MONTHLY) {
    return `month ${getMonthOfYear(startDate)}`;
  } else {
    return `year ${getYear(startDate)}`;
  }
};
