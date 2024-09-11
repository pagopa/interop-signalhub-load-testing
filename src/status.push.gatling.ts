import {
  simulation,
  scenario,
  exec,
  rampUsers,
  getParameter,
  getEnvironmentVariable
} from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { baseUrl, duration, givenUsersDistributedInADuration, users } from "./lib/setup";

export default simulation((setUp) => {
  console.log(
    `### STARTING LOAD TEST against ${baseUrl} with ${users} users for ${duration} seconds ###`
  );

  // Define an HTTP protocol
  const httpProtocol = http.baseUrl(baseUrl);

  // Write the scenario STATUS
  const useCaseGetStatus = exec(http("Status").get("/status"));
  const statusScenario = scenario("Status").exec(useCaseGetStatus);

  // Define the injection profile
  setUp(statusScenario.injectOpen(givenUsersDistributedInADuration)).protocols(httpProtocol);
});
