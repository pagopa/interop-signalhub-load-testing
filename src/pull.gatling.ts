import { simulation, scenario, exec, rampUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import {
  baseUrl,
  duration,
  eserviceId,
  givenUsersDistributedInADuration,
  injectedUsersFromStartingRateToTargetRate,
  profile,
  pullApiVersion,
  users,
  voucher
} from "./lib/setup";

export default simulation((setUp) => {
  console.log(
    `### STARTING LOAD TEST against ${baseUrl} with ${users} users for ${duration} seconds ###`
  );
  const signalId = 0;
  const size = 100;

  // Define an HTTP protocol
  const httpProtocol = http.baseUrl(baseUrl);

  // Write the scenario PULL
  const useCasePullSignals = exec(
    http("Pull")
      .get(`/${pullApiVersion}/pull/signals/${eserviceId}`)
      .header("Authorization", `Bearer ${voucher}`)
      .queryParam("size", size)
      .queryParam("signalId", signalId)
  );
  const pullingSignalsScenario = scenario("Pull").exec(useCasePullSignals);

  // Define the injection profile
  const injectedProfile =
    profile === "increment"
      ? injectedUsersFromStartingRateToTargetRate
      : givenUsersDistributedInADuration;

  setUp(pullingSignalsScenario.injectOpen(injectedProfile)).protocols(httpProtocol);
});
