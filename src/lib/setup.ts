import {
  getParameter,
  getEnvironmentVariable,
  rampUsers,
  incrementUsersPerSec
} from "@gatling.io/core";

export const baseUrl = getEnvironmentVariable("BASE_URL", "http://localhost:3001");

export const users = parseInt(getParameter("users", "1"));
export const duration = parseInt(getParameter("duration", "5"));

export const startingUsers = parseInt(getParameter("startingUsers", "500"));
export const incrementUsers = parseFloat(getParameter("incrementUsers", "100"));
export const eachLevelLasting = parseInt(getParameter("eachLevelLasting", "5"));
export const incrementTimes = parseInt(getParameter("incrementTimes", "5"));
// tot req increments = (100 * 5 * 5) = 5000
// tot req starting = 10 * 5 * 5 = 250
// tot req 5250
// export const separatedByRampsLasting = parseInt(getParameter("separatedByRampsLasting", "5"));

export const voucher = getParameter("voucher", "");
export const eserviceId = getParameter("eserviceId", "31b4e4e6-855d-42fa-9705-28bc7f8545ff");

export const profile = getParameter("profile", "ramping"); // increment

export const givenUsersDistributedInADuration = rampUsers(users).during(duration);

// generate an open workload injection profile
// with levels of 10, 15, 20, 25 and 30 arriving users per second
// each level lasting 10 seconds
// separated by linear ramps lasting 10 seconds
export const injectedUsersFromStartingRateToTargetRate = incrementUsersPerSec(incrementUsers)
  .times(incrementTimes)
  .eachLevelLasting(eachLevelLasting)
  // .separatedByRampsLasting(separatedByRampsLasting)
  .startingFrom(startingUsers); // Double
