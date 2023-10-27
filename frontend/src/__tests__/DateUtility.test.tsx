import DateUtility from "../services/DateUtility";

describe("getDuration combinations", () => {
  const d1 = new Date("2023-11-30T12:50:34");
  const d2 = new Date("2027-04-22T14:43:33");

  it("calculates all units correctly", () => {
    const diff = DateUtility.getDifference(d1, d2);
    expect(diff.years).toBe(3);
    expect(diff.months).toBe(4);
    expect(diff.weeks).toBe(3);
    expect(diff.days).toBe(4);
  });

  it("calculates starting from months", () => {
    const diff = DateUtility.getDifference(d1, d2, "months");

    expect(diff.years).toBeUndefined();
    expect(diff.months).toBe(41);
    expect(diff.weeks).toBe(3);
    expect(diff.days).toBe(4);
  });

  it("calculates starting from weeks", () => {
    const diff = DateUtility.getDifference(d1, d2, "weeks");

    expect(diff.years).toBeUndefined();
    expect(diff.months).toBeUndefined();
    expect(diff.weeks).toBe(177);
    expect(diff.days).toBe(4);
  });

  it("calculates starting from days", () => {
    const diff = DateUtility.getDifference(d1, d2, "days");

    expect(diff.years).toBeUndefined();
    expect(diff.months).toBeUndefined();
    expect(diff.weeks).toBeUndefined();
    expect(diff.days).toBe(1240);
  });
});
