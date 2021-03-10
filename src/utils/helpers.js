import { AUTH_TOKEN, USER_ID, REPORTED_PROBLEMS } from '../constants';

const milliSecondsPerMinute = 60 * 1000;
const milliSecondsPerHour = milliSecondsPerMinute * 60;
const milliSecondsPerDay = milliSecondsPerHour * 24;
const milliSecondsPerMonth = milliSecondsPerDay * 30;
const milliSecondsPerYear = milliSecondsPerDay * 365;
// GETTERS
export function getLocalItem(item) {
  return JSON.parse(localStorage.getItem(item));
}

export function getAuth() {
  return getLocalItem(AUTH_TOKEN);
}

export function getUserIDFromLocalStorage() {
  return getLocalItem(USER_ID);
}

export function getUserReportedProblemsFromLS() {
  return getLocalItem(REPORTED_PROBLEMS);
}

// SETTERS
export function setLocalItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalItem(key) {
  return localStorage.removeItem(key);
}

export function setAuth(value) {
  return setLocalItem(AUTH_TOKEN, value);
}

export function setUserIDInLocalStorage(value) {
  return setLocalItem(USER_ID, value);
}

export function removeIDFromLocalStorage() {
  return removeLocalItem(USER_ID);
}

export function removeAuthFromLocalStorage() {
  return removeLocalItem(AUTH_TOKEN);
}

// HELPERS
export function canUserReportRestaurantProblem(id) {
  const userReportedProblems = getUserReportedProblemsFromLS() || {};
  if (userReportedProblems[id]) {
    const oneDayHasElapsedSinceLastReport =
      Date.now() - userReportedProblems[id] > milliSecondsPerDay;
    return oneDayHasElapsedSinceLastReport;
  }
  return true;
}

export function updateUserReportedProblems(value) {
  const userReportedProblems = getUserReportedProblemsFromLS() || {};
  userReportedProblems[value] = Date.now();
  return setLocalItem(REPORTED_PROBLEMS, userReportedProblems);
}

// moment copycat
function timeDifference(current, previous) {
  const elapsed = current - previous;

  if (elapsed < milliSecondsPerMinute / 3) {
    return 'just now';
  }

  if (elapsed < milliSecondsPerMinute) {
    return 'less than 1 min ago';
  }
  if (elapsed < milliSecondsPerHour) {
    return `${Math.round(elapsed / milliSecondsPerMinute)} min ago`;
  }
  if (elapsed < milliSecondsPerDay) {
    return `${Math.round(elapsed / milliSecondsPerHour)} h ago`;
  }
  if (elapsed < milliSecondsPerMonth) {
    return `${Math.round(elapsed / milliSecondsPerDay)} days ago`;
  }
  if (elapsed < milliSecondsPerYear) {
    return `${Math.round(elapsed / milliSecondsPerMonth)} mo ago`;
  }
  return `${Math.round(elapsed / milliSecondsPerYear)} years ago`;
}

export function timeDifferenceForDate(date) {
  const now = new Date().getTime();
  return timeDifference(now, date);
}

// RESTAURANT HELPERS
export function displayCuisines(cuisines) {
  return cuisines.map((e) => e.split('_').join(' ')).join(' / ');
}
