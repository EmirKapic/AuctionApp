export interface Difference {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
}

export type DateUnit = "years" | "months" | "weeks" | "days";

//all methods work with UNIX time format (ms from january 1 1970)
const DateUtility = {
  getDifference(
    dateFirst: Date,
    dateSecond: Date,
    largestUnit: DateUnit = "years",
  ): Difference {
    const timeDifference = Math.abs(dateFirst.getTime() - dateSecond.getTime());
    const daysDiff = Math.round(timeDifference / (1000 * 60 * 60 * 24)) + 1;
    switch (largestUnit) {
      case "years": {
        return {
          years: Math.floor(daysDiff / 365),
          months: Math.floor((daysDiff % 365) / 30),
          weeks: Math.floor(((daysDiff % 365) % 30) / 7),
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "months": {
        return {
          months: Math.floor(daysDiff / 30),
          weeks: Math.floor(((daysDiff % 365) % 30) / 7),
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "weeks": {
        return {
          weeks: Math.floor(daysDiff / 7),
          days: Math.floor(((daysDiff % 365) % 30) % 7),
        };
      }
      case "days": {
        return {
          days: Math.floor(daysDiff),
        };
      }
      default:
        return {};
    }
  },
};

export default DateUtility;
