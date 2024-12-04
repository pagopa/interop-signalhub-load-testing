import {
  getParameter,
  getEnvironmentVariable,
  rampUsers,
  incrementUsersPerSec
} from "@gatling.io/core";

export const baseUrl = getEnvironmentVariable("BASE_URL", "http://localhost:3001");

export const pushApiVersion = getEnvironmentVariable("PUSH_API_VERSION");
export const pullApiVersion = getEnvironmentVariable("PULL_API_VERSION");

export const users = parseInt(getParameter("users", "1"));
export const duration = parseInt(getParameter("duration", "5"));

export const startingUsers = parseInt(getParameter("startingUsers", "100"));
export const incrementUsers = parseFloat(getParameter("incrementUsers", "25"));
export const eachLevelLasting = parseInt(getParameter("eachLevelLasting", "5"));
export const incrementTimes = parseInt(getParameter("incrementTimes", "5"));

// level 0, (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// level 1, (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// level 2, (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// level 3, (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// level 4. (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// level 5, (starting 100 * 5 sec) + (increment 25 * 5 sec) = 625 users
// tot req 625 * 6 = 3750

export const voucher = getParameter("voucher", "");
export const eserviceId = getParameter("eserviceId", "31b4e4e6-855d-42fa-9705-28bc7f8545ff");

export const profile = getParameter("profile", "ramping"); // increment

export const givenUsersDistributedInADuration = rampUsers(users).during(duration);

export const injectedUsersFromStartingRateToTargetRate = incrementUsersPerSec(incrementUsers)
  .times(incrementTimes)
  .eachLevelLasting(eachLevelLasting)
  .startingFrom(startingUsers)
