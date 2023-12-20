import dayjs from "dayjs";
export interface Duration {
  weeks?: number;
  days?: number;
  hours?: number;
}

type DateUnit = "week" | "day" | "hour";

function createUnitName(unit: DateUnit, count: number): string {
  if (count > 1) return (unit += "s");
  else return unit;
}

const DateUtility = {
  getDuration(
    dateFirst: Date,
    dateSecond: Date,
    largestUnit: DateUnit = "week",
  ): string {
    const date1 = dayjs(dateFirst);
    const date2 = dayjs(dateSecond);

    const daysDiff = Math.abs(date1.diff(date2, "days"));
    const hoursDiff = Math.abs(date1.diff(date2, "hours"));

    switch (largestUnit) {
      case "week": {
        const weeks = Math.floor(daysDiff / 7);
        const days = daysDiff % 7;
        const hours =
          hoursDiff - Math.floor(daysDiff / 7) * 168 - (daysDiff % 7) * 24;
        return (
          (weeks
            ? weeks.toString() + " " + createUnitName("week", weeks) + " "
            : "") +
          (days
            ? days.toString() + " " + createUnitName("day", days) + " "
            : "") +
          (hours ? hours.toString() + " " + createUnitName("hour", hours) : "")
        ).trim();
      }
      case "day": {
        const days = daysDiff;
        const hours = hoursDiff - daysDiff * 24;
        return (
          (days
            ? days.toString() + " " + createUnitName("day", days) + " "
            : "") +
          (hours && hours.toString() + " " + createUnitName("hour", hours))
        ).trim();
      }
      case "hour": {
        return hoursDiff
          ? hoursDiff.toString() + " " + createUnitName("hour", hoursDiff)
          : "";
      }
    }
  },
  getMaxDayForMonth(month: number, year: number): number | undefined {
    if (month < 1 || month > 12) throw new Error("Invalid month");
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      case 2:
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
          ? 28
          : 29;
    }
  },
};

export default DateUtility;
