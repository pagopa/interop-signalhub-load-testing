import {
  simulation,
  scenario,
  exec,
  rampUsers,
  getParameter,
  getEnvironmentVariable
} from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { baseUrlPush, duration, rampUsersProfile, users } from "./lib/setup";

export default simulation((setUp) => {
  console.log(
    `### STARTING LOAD TEST against ${baseUrlPush} with ${users} users for ${duration} seconds ###`
  );

  // Define an HTTP protocol
  const httpProtocol = http.baseUrl(baseUrlPush);

  // Write the scenario STATUS
  const useCaseGetStatus = exec(http("Status").get("/status"));
  const statusScenario = scenario("Status").exec(useCaseGetStatus);

  // Define the injection profile
  setUp(statusScenario.injectOpen(rampUsersProfile)).protocols(httpProtocol);
});
