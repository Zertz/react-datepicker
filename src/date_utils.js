import isDate from "date-fns/isDate";
import isValidDate from "date-fns/isValid";
import format from "date-fns/format";
import add from "date-fns/add";
import getSeconds from "date-fns/getSeconds";
import getMinutes from "date-fns/getMinutes";
import getHours from "date-fns/getHours";
import getDay from "date-fns/getDay";
import getDate from "date-fns/getDate";
import dfgetWeek from "date-fns/getWeek";
import getMonth from "date-fns/getMonth";
import getQuarter from "date-fns/getQuarter";
import getYear from "date-fns/getYear";
import setSeconds from "date-fns/setSeconds";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";
import setMonth from "date-fns/setMonth";
import setQuarter from "date-fns/setQuarter";
import setYear from "date-fns/setYear";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import differenceInCalendarMonths from "date-fns/differenceInCalendarMonths";
import differenceInCalendarYears from "date-fns/differenceInCalendarYears";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfQuarter from "date-fns/startOfQuarter";
import startOfYear from "date-fns/startOfYear";
import endOfDay from "date-fns/endOfDay";
import endOfWeek from "date-fns/endOfWeek";
import endOfMonth from "date-fns/endOfMonth";
import dfIsEqual from "date-fns/isEqual";
import dfIsSameDay from "date-fns/isSameDay";
import dfIsSameMonth from "date-fns/isSameMonth";
import dfIsSameQuarter from "date-fns/isSameQuarter";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isWithinInterval from "date-fns/isWithinInterval";
import toDate from "date-fns/toDate";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";

export const DEFAULT_YEAR_ITEM_NUMBER = 12;

// ** Date Constructors **

export function newDate(value) {
  const d = value
    ? typeof value === "string" || value instanceof String
      ? parseISO(value)
      : toDate(value)
    : new Date();
  return isValid(d) ? d : null;
}

export function parseDate(value, dateFormat, locale) {
  let parsedDate = null;
  let localeObject = getLocaleObject(locale) || getDefaultLocale();
  if (Array.isArray(dateFormat)) {
    dateFormat.forEach((df) => {
      let tryParseDate = parse(value, df, new Date(), { locale: localeObject });
      if (
        isValid(tryParseDate) &&
        value === format(tryParseDate, df, { awareOfUnicodeTokens: true })
      ) {
        parsedDate = tryParseDate;
      }
    });
    return parsedDate;
  }

  parsedDate = parse(value, dateFormat, new Date(), { locale: localeObject });

  return isValid(parsedDate) &&
    value === format(parsedDate, dateFormat, { awareOfUnicodeTokens: true })
    ? parsedDate
    : null;
}

// ** Date "Reflection" **

export { isDate };

export function isValid(date) {
  return isValidDate(date) && isAfter(date, new Date("1/1/1000"));
}

// ** Date Formatting **

export function formatDate(date, formatStr, locale) {
  let localeObj = getLocaleObject(locale);
  if (
    !localeObj &&
    !!getDefaultLocale() &&
    !!getLocaleObject(getDefaultLocale())
  ) {
    localeObj = getLocaleObject(getDefaultLocale());
  }
  return format(date, formatStr, {
    locale: localeObj ? localeObj : null,
    awareOfUnicodeTokens: true,
  });
}

export function safeDateFormat(date, { dateFormat, locale }) {
  return (
    (date &&
      formatDate(
        date,
        Array.isArray(dateFormat) ? dateFormat[0] : dateFormat,
        locale
      )) ||
    ""
  );
}

// ** Date Setters **

export function setTime(date, { hour = 0, minute = 0, second = 0 }) {
  return setHours(setMinutes(setSeconds(date, second), minute), hour);
}

export { setMinutes, setHours, setMonth, setQuarter, setYear };

// ** Date Getters **

// getDay Returns day of week, getDate returns day of month
export {
  getSeconds,
  getMinutes,
  getHours,
  getMonth,
  getQuarter,
  getYear,
  getDay,
  getDate,
};

export function getWeek(date, locale) {
  let localeObj =
    (locale && getLocaleObject(locale)) ||
    (getDefaultLocale() && getLocaleObject(getDefaultLocale()));
  return dfgetWeek(date, localeObj ? { locale: localeObj } : null);
}

export function getDayOfWeekCode(day, locale) {
  return formatDate(day, "ddd", locale);
}

// *** Start of ***

export function getStartOfDay(date) {
  return startOfDay(date);
}

export function getStartOfWeek(date, locale) {
  let localeObj = locale
    ? getLocaleObject(locale)
    : getLocaleObject(getDefaultLocale());
  return startOfWeek(date, { locale: localeObj });
}

export function getStartOfMonth(date) {
  return startOfMonth(date);
}

export function getStartOfYear(date) {
  return startOfYear(date);
}

export function getStartOfQuarter(date) {
  return startOfQuarter(date);
}

export function getStartOfToday() {
  return startOfDay(newDate());
}

// *** End of ***

export function getEndOfWeek(date) {
  return endOfWeek(date);
}

export function getEndOfMonth(date) {
  return endOfMonth(date);
}

// ** Date Math **

// *** Addition ***

export { add };

// ** Date Comparison **

export { isBefore, isAfter };

export function isSameMonth(date1, date2) {
  if (date1 && date2) {
    return dfIsSameMonth(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameQuarter(date1, date2) {
  if (date1 && date2) {
    return dfIsSameQuarter(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isSameDay(date1, date2) {
  if (date1 && date2) {
    return dfIsSameDay(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isEqual(date1, date2) {
  if (date1 && date2) {
    return dfIsEqual(date1, date2);
  } else {
    return !date1 && !date2;
  }
}

export function isDayInRange(day, startDate, endDate) {
  let valid;
  const start = startOfDay(startDate);
  const end = endOfDay(endDate);

  try {
    valid = isWithinInterval(day, { start, end });
  } catch (err) {
    valid = false;
  }
  return valid;
}

// *** Diffing ***

export function getDaysDiff(date1, date2) {
  return differenceInCalendarDays(date1, date2);
}

// ** Date Localization **

export function setDefaultLocale(localeName) {
  const scope = typeof window !== "undefined" ? window : global;

  scope.__localeId__ = localeName;
}

export function getDefaultLocale() {
  const scope = typeof window !== "undefined" ? window : global;

  return scope.__localeId__;
}

export function getLocaleObject(localeSpec) {
  // Treat it as a raw date-fns locale object
  return localeSpec;
}

export function getFormattedWeekdayInLocale(date, formatFunc, locale) {
  return formatFunc(formatDate(date, "EEEE", locale));
}

export function getWeekdayMinInLocale(date, locale) {
  return formatDate(date, "EEEEEE", locale);
}

export function getWeekdayShortInLocale(date, locale) {
  return formatDate(date, "EEE", locale);
}

export function getMonthInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLLL", locale);
}

export function getMonthShortInLocale(month, locale) {
  return formatDate(setMonth(newDate(), month), "LLL", locale);
}

export function getQuarterShortInLocale(quarter, locale) {
  return formatDate(setQuarter(newDate(), quarter), "QQQ", locale);
}

// ** Utils for some components **

export function isDayDisabled(day, { minDate, maxDate, filterDate } = {}) {
  return (
    isOutOfBounds(day, { minDate, maxDate }) ||
    (filterDate && !filterDate(newDate(day))) ||
    false
  );
}

export function isDayExcluded() {
  return false;
}

export function isMonthDisabled(month, { minDate, maxDate, filterDate } = {}) {
  return (
    isOutOfBounds(month, { minDate, maxDate }) ||
    (filterDate && !filterDate(newDate(month))) ||
    false
  );
}

export function isMonthinRange(startDate, endDate, m, day) {
  const startDateYear = getYear(startDate);
  const startDateMonth = getMonth(startDate);
  const endDateYear = getYear(endDate);
  const endDateMonth = getMonth(endDate);
  const dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateMonth <= m && m <= endDateMonth;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateMonth <= m) ||
      (dayYear === endDateYear && endDateMonth >= m) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
}

export function isQuarterDisabled(
  quarter,
  { minDate, maxDate, filterDate } = {}
) {
  return (
    isOutOfBounds(quarter, { minDate, maxDate }) ||
    (filterDate && !filterDate(newDate(quarter))) ||
    false
  );
}

export function isYearDisabled(year, { minDate, maxDate } = {}) {
  const date = new Date(year, 0, 1);
  return isOutOfBounds(date, { minDate, maxDate }) || false;
}

export function isQuarterInRange(startDate, endDate, q, day) {
  const startDateYear = getYear(startDate);
  const startDateQuarter = getQuarter(startDate);
  const endDateYear = getYear(endDate);
  const endDateQuarter = getQuarter(endDate);
  const dayYear = getYear(day);
  if (startDateYear === endDateYear && startDateYear === dayYear) {
    return startDateQuarter <= q && q <= endDateQuarter;
  } else if (startDateYear < endDateYear) {
    return (
      (dayYear === startDateYear && startDateQuarter <= q) ||
      (dayYear === endDateYear && endDateQuarter >= q) ||
      (dayYear < endDateYear && dayYear > startDateYear)
    );
  }
}

export function isOutOfBounds(day, { minDate, maxDate } = {}) {
  return (
    (minDate && differenceInCalendarDays(day, minDate) < 0) ||
    (maxDate && differenceInCalendarDays(day, maxDate) > 0)
  );
}

export function isTimeDisabled(time, { filterTime } = {}) {
  return (filterTime && !filterTime(time)) || false;
}

export function isTimeInDisabledRange(time, { minTime, maxTime }) {
  if (!minTime || !maxTime) {
    throw new Error("Both minTime and maxTime props required");
  }
  const base = newDate();
  const baseTime = setHours(setMinutes(base, getMinutes(time)), getHours(time));
  const min = setHours(
    setMinutes(base, getMinutes(minTime)),
    getHours(minTime)
  );
  const max = setHours(
    setMinutes(base, getMinutes(maxTime)),
    getHours(maxTime)
  );

  let valid;
  try {
    valid = !isWithinInterval(baseTime, { start: min, end: max });
  } catch (err) {
    valid = false;
  }
  return valid;
}

export function monthDisabledBefore(day, { minDate } = {}) {
  const previousMonth = add(day, { months: -1 });
  return (
    (minDate && differenceInCalendarMonths(minDate, previousMonth) > 0) || false
  );
}

export function monthDisabledAfter(day, { maxDate } = {}) {
  const nextMonth = add(day, { months: 1 });
  return (
    (maxDate && differenceInCalendarMonths(nextMonth, maxDate) > 0) || false
  );
}

export function yearDisabledBefore(day, { minDate } = {}) {
  const previousYear = add(day, { years: -1 });
  return (
    (minDate && differenceInCalendarYears(minDate, previousYear) > 0) || false
  );
}

export function yearDisabledAfter(day, { maxDate } = {}) {
  const nextYear = add(day, { years: 1 });
  return (maxDate && differenceInCalendarYears(nextYear, maxDate) > 0) || false;
}

export function getEffectiveMinDate({ minDate }) {
  return minDate;
}

export function getEffectiveMaxDate({ maxDate }) {
  return maxDate;
}

export function getHightLightDaysMap(
  highlightDates = [],
  defaultClassName = "react-datepicker__day--highlighted"
) {
  const dateClasses = new Map();
  for (let i = 0, len = highlightDates.length; i < len; i++) {
    const obj = highlightDates[i];
    if (isDate(obj)) {
      const key = formatDate(obj, "MM.dd.yyyy");
      const classNamesArr = dateClasses.get(key) || [];
      if (!classNamesArr.includes(defaultClassName)) {
        classNamesArr.push(defaultClassName);
        dateClasses.set(key, classNamesArr);
      }
    } else if (typeof obj === "object") {
      const keys = Object.keys(obj);
      const className = keys[0];
      const arrOfDates = obj[keys[0]];
      if (typeof className === "string" && arrOfDates.constructor === Array) {
        for (let k = 0, len = arrOfDates.length; k < len; k++) {
          const key = formatDate(arrOfDates[k], "MM.dd.yyyy");
          const classNamesArr = dateClasses.get(key) || [];
          if (!classNamesArr.includes(className)) {
            classNamesArr.push(className);
            dateClasses.set(key, classNamesArr);
          }
        }
      }
    }
  }

  return dateClasses;
}

export function timesToInjectAfter(
  startOfDay,
  currentTime,
  currentMultiplier,
  intervals,
  injectedTimes
) {
  const l = injectedTimes.length;
  const times = [];
  for (let i = 0; i < l; i++) {
    const injectedTime = add(
      add(startOfDay, { hours: getHours(injectedTimes[i]) }),
      { minutes: getMinutes(injectedTimes[i]) }
    );
    const nextTime = add(startOfDay, {
      minutes: (currentMultiplier + 1) * intervals,
    });

    if (
      isAfter(injectedTime, currentTime) &&
      isBefore(injectedTime, nextTime)
    ) {
      times.push(injectedTimes[i]);
    }
  }

  return times;
}

export function getYearsPeriod(
  date,
  yearItemNumber = DEFAULT_YEAR_ITEM_NUMBER
) {
  const endPeriod = Math.ceil(getYear(date) / yearItemNumber) * yearItemNumber;
  const startPeriod = endPeriod - (yearItemNumber - 1);
  return { startPeriod, endPeriod };
}
