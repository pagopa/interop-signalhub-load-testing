export interface PushSignalPayload {
  signalType: "CREATE" | "UPDATE" | "DELETE" | "SEEDUPDATE";
  objectId: string;
  eserviceId: string;
  signalId: number;
  objectType: string;
}

export function generateRandomSignalId() {
  return parseInt(Number(Math.random() * Number.MAX_SAFE_INTEGER).toFixed(0), 10);
}

export function createSignal(partialSignal: Partial<PushSignalPayload> = {}): PushSignalPayload {
  return {
    signalId: 1,
    eserviceId: "-",
    objectId: "object-id-perf-test",
    signalType: "CREATE",
    objectType: "object-type-perf-test",
    ...partialSignal
  };
}

export function toJson(signalPayload: PushSignalPayload): string {
  return JSON.stringify(signalPayload);
}
