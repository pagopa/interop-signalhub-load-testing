import { simulation, scenario, exec, rampUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { baseUrlPull, duration, eserviceId, rampUsersProfile, users, voucher } from "./lib/setup";

export default simulation((setUp) => {
  console.log(
    `### STARTING LOAD TEST against ${baseUrlPull} with ${users} users for ${duration} seconds ###`
  );
  const signalId = 0;
  const size = 100;

  // Define an HTTP protocol
  const httpProtocol = http.baseUrl(baseUrlPull);

  // Write the scenario PULL
  const useCasePullSignals = exec(
    http("Pull")
      .get(`/signals/${eserviceId}`)
      .header("Authorization", `Bearer ${voucher}`)
      .queryParam("size", size)
      .queryParam("signalId", signalId)
  );
  const pullingSignalsScenario = scenario("Pull").exec(useCasePullSignals);

  // Define the injection profile
  setUp(pullingSignalsScenario.injectOpen(rampUsersProfile)).protocols(httpProtocol);
});
