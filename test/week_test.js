import React from "react";
import Week from "../src/week";
import WeekNumber from "../src/week_number";
import Day from "../src/day";
import { shallow } from "enzyme";
import * as utils from "../src/date_utils";

describe("Week", () => {
  it("should have the week CSS class", () => {
    const week = shallow(<Week day={utils.newDate()} />);
    expect(week.hasClass("react-datepicker__week")).to.equal(true);
  });

  it("should render the days of the week", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const week = shallow(<Week day={weekStart} />);

    const days = week.find(Day);
    expect(days.length).to.equal(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.add(weekStart, { days: offset });
      assert(utils.isSameDay(day.prop("day"), expectedDay));
    });

    const weekNumber = week.find(WeekNumber);
    expect(weekNumber.length).to.equal(0);
  });

  it("should render the week number", () => {
    const weekStart = utils.getStartOfWeek(utils.newDate("2015-12-20"));
    const week = shallow(<Week showWeekNumber day={weekStart} />);

    const days = week.find(Day);
    expect(days.length).to.equal(7);
    days.forEach((day, offset) => {
      const expectedDay = utils.add(weekStart, { days: offset });
      assert(utils.isSameDay(day.prop("day"), expectedDay));
    });

    const weekNumber = week.find(WeekNumber);
    expect(weekNumber.length).to.equal(1);
  });

  it("should call the provided onDayClick function", () => {
    let dayClicked = null;

    function onDayClick(day) {
      dayClicked = day;
    }

    const weekStart = utils.newDate("2015-12-20");
    const week = shallow(<Week day={weekStart} onDayClick={onDayClick} />);
    const day = week.find(Day).at(0);
    day.simulate("click");
    assert(utils.isSameDay(day.prop("day"), dayClicked));
  });

  it("should call the provided onWeekSelect function and pass the week number", () => {
    let weekNumberReceived = null;

    function onWeekClick(unused, newWeekNumber) {
      weekNumberReceived = newWeekNumber;
    }

    const weekStart = utils.newDate("2015-12-20");
    const realWeekNumber = utils.getWeek(weekStart);
    const week = shallow(
      <Week day={weekStart} showWeekNumber onWeekSelect={onWeekClick} />
    );
    const weekNumberElement = week.find(WeekNumber);
    weekNumberElement.simulate("click");
    expect(weekNumberReceived).to.equal(realWeekNumber);
  });

  it("should set the week number with the provided formatWeekNumber function", () => {
    let firstDayReceived = null;

    function weekNumberFormatter(newFirstWeekDay) {
      firstDayReceived = newFirstWeekDay;
      return 9;
    }

    const weekStart = utils.newDate("2015-12-20");
    const week = shallow(
      <Week
        day={weekStart}
        showWeekNumber
        formatWeekNumber={weekNumberFormatter}
      />
    );
    const weekNumberElement = week.find(WeekNumber);

    expect(utils.isEqual(firstDayReceived, weekStart)).to.be.true;
    expect(weekNumberElement.prop("weekNumber")).to.equal(9);
  });
});
