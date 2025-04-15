// src/grpc/server.ts
import * as grpc from "@grpc/grpc-js";
import { loadProto } from "./loader";

export function startGrpcServer(
  handlers: Record<string, any>,
  port: string = "50051"
) {
  const grpcPackage = loadProto();
  const server = new grpc.Server();

  // Register only the handlers you passed in
  for (const [pkgKey, servicePackage] of Object.entries(grpcPackage)) {
    for (const [serviceName, serviceDef] of Object.entries(
      servicePackage as any
    )) {
      if ((serviceDef as any).service && handlers[serviceName]) {
        server.addService((serviceDef as any).service, handlers[serviceName]);
        console.log(`✅ Registered gRPC service: ${pkgKey}.${serviceName}`);
      }
    }
  }

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log(`🚀 gRPC server running on port ${port}`);
      server.start();
    }
  );
}
