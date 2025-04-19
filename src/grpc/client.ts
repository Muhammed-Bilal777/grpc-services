import { Server, ServerCredentials } from "@grpc/grpc-js";
import { GreeterServiceName } from "../../generated/hello";
import { sayHelloHandler } from "../handler/handler";

export function startGrpcServer() {
  const server = new Server();

  // Add service manually since ts-proto did not export `GreeterService`
  server.addService(
    {
      service: {
        SayHello: {
          path: `/${GreeterServiceName}/SayHello`,
          requestStream: false,
          responseStream: false,
          requestSerialize: (arg: any) => Buffer.from(JSON.stringify(arg)),
          requestDeserialize: (buffer: Buffer) => JSON.parse(buffer.toString()),
          responseSerialize: (arg: any) => Buffer.from(JSON.stringify(arg)),
          responseDeserialize: (buffer: Buffer) =>
            JSON.parse(buffer.toString()),
        },
      },
    } as any,
    {
      SayHello: sayHelloHandler,
    }
  );

  const address = "0.0.0.0:50051";
  server.bindAsync(address, ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error("gRPC Server error:", err);
      return;
    }
    server.start();
    console.log(`🚀 gRPC Server is running at ${address}`);
  });
}
