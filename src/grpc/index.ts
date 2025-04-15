import { instrumentationInitializetion } from "../tracing";

instrumentationInitializetion();

export { grpcClients } from "./client";

export { startGrpcServer } from "./server";
