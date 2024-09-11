import { getParameter, getEnvironmentVariable, rampUsers } from "@gatling.io/core";

export const baseUrlPush = getEnvironmentVariable("BASE_URL_PUSH", "http://localhost:3000");
export const baseUrlPull = getEnvironmentVariable("BASE_URL_PULL", "http://localhost:3001");

export const users = parseInt(getParameter("users", "1"));
export const duration = parseInt(getParameter("duration", "5"));
export const voucher = getParameter("voucher", "");

export const rampUsersProfile = rampUsers(users).during(duration);

export const eserviceId = "31b4e4e6-855d-42fa-9705-28bc7f8545ff";
