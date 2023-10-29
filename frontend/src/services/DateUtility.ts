import dayjs from "dayjs";
export interface Difference {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
}

export type DateUnit = "years" | "months" | "weeks" | "days";

const DateUtility = {
  getDifference(
    dateFirst: Date,
    dateSecond: Date,
    largestUnit: DateUnit = "years",
  ): Difference {
    const date1 = dayjs(dateFirst);
    const date2 = dayjs(dateSecond);

    const yearsDiff = Math.abs(date1.diff(date2, "years"));
    const monthsDiff = Math.abs(date1.diff(date2, "months"));
    const weeksDiff = Math.abs(date1.diff(date2, "weeks"));
    const daysDiff = Math.abs(date1.diff(date2, "days"));

    switch (largestUnit) {
      case "years": {
        return {
          years: yearsDiff,
          months: monthsDiff - yearsDiff * 12,
          weeks: Math.floor(((daysDiff % 365) % 30) / 7),
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "months": {
        return {
          months: monthsDiff,
          weeks: Math.floor(((daysDiff % 365) % 30) / 7),
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "weeks": {
        return {
          weeks: weeksDiff,
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "days": {
        return {
          days: daysDiff,
        };
      }
    }
  },
};

export default DateUtility;
