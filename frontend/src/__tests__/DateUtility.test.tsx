import DateUtility from "../services/DateUtility";

describe("getDuration calculations", () => {
  const d1 = new Date("2023-10-30T11:04:12");
  const d2 = new Date("2023-11-07T13:00:00");

  it("calculates from weeks correctly", () => {
    const diff = DateUtility.getDuration(d1, d2);
    expect(diff).toBe("1 week 1 day 1 hour");
  });
  it("calculates from days correctly", () => {
    const diff = DateUtility.getDuration(d1, d2, "day");
    expect(diff).toBe("8 days 1 hour");
  });
  it("calculates from hours correctly", () => {
    const diff = DateUtility.getDuration(d1, d2, "hour");
    expect(diff).toBe("193 hours");
  });
});

describe("missing units", () => {
  it("doesnt show weeks", () => {
    const d1 = new Date("2023-11-07T13:00:00");
    const d2 = new Date("2023-11-09T15:00:00");
    const diff = DateUtility.getDuration(d1, d2);
    expect(diff).toBe("2 days 2 hours");
  });
  it("doesnt show days", () => {
    const d1 = new Date("2023-11-07T13:00:00");
    const d2 = new Date("2023-11-14T15:00:00");
    const diff = DateUtility.getDuration(d1, d2);
    expect(diff).toBe("1 week 2 hours");
  });
  it("doesnt show hours", () => {
    const d1 = new Date("2023-11-07T13:00:00");
    const d2 = new Date("2023-11-09T13:00:00");
    const diff = DateUtility.getDuration(d1, d2);
    expect(diff).toBe("2 days");
  });
});
