export interface WeeksAndDays {
  weeks: number;
  days: number;
}
//all methods work with UNIX time format (ms from january 1 1970)
const DateUtility = {
  getWeeksAndDays: function (
    dateFirst: number,
    dateSecond: number,
  ): WeeksAndDays {
    const millis = dateFirst - dateSecond;
    const days = Math.round(millis / (1000 * 60 * 60 * 24));
    return { weeks: Math.round(days / 7), days: days % 7 };
  },
};

export default DateUtility;
