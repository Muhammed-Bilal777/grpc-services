// src/grpc/client.ts
import * as grpc from "@grpc/grpc-js";
import { loadProto } from "./loader";

const grpcPackage = loadProto();
export const grpcClients: Record<string, any> = {};

for (const [pkgKey, servicePackage] of Object.entries(grpcPackage)) {
  for (const [serviceName, ServiceConstructor] of Object.entries(
    servicePackage as any
  )) {
    if (typeof ServiceConstructor === "function") {
      grpcClients[serviceName] = new (ServiceConstructor as any)(
        "localhost:50051",
        grpc.credentials.createInsecure()
      );
      console.log(`🔌 Created gRPC client: ${pkgKey}.${serviceName}`);
    }
  }
}
