import { simulation, scenario, exec, rampUsers, StringBody } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { createSignal, generateRandomSignalId, toJson } from "./lib";
import { baseUrlPush, duration, eserviceId, rampUsersProfile, users, voucher } from "./lib/setup";

export default simulation((setUp) => {
  console.log(
    `### STARTING LOAD TEST against ${baseUrlPush} with ${users} users for ${duration} seconds ###`
  );

  // Define an HTTP protocol
  const httpProtocol = http.baseUrl(baseUrlPush);

  const buildSignalPayload = (session: any) => {
    const signalId = session.get("signalId");
    return toJson(createSignal({ eserviceId, signalId }));
  };
  // Write the scenario PUSH
  const useCasePushingSignals = exec(
    http("Push")
      .post(`/signals`)
      .header("Authorization", `Bearer ${voucher}`)
      .asJson()
      .body(StringBody(buildSignalPayload))
  );
  const pushingSignalsScenario = scenario("Push")
    .exec((session) => {
      const aNewSession = session.set("signalId", generateRandomSignalId());
      return aNewSession;
    })
    .exec(useCasePushingSignals);

  // Define the injection profile
  setUp(pushingSignalsScenario.injectOpen(rampUsersProfile)).protocols(httpProtocol);
});
