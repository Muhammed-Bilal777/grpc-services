import path from "path";
import dotenv from "dotenv";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

dotenv.config();

export function loadProto() {
  const protoPath = process.env.PROTO_PATH || "./proto/service.proto";
  const absolutePath = path.resolve(protoPath);

  const packageDefinition = protoLoader.loadSync(absolutePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  // ✅ FIX: use grpc-js to load from protoLoader manually
  const grpcPackage = (grpc as any).loadPackageDefinition(packageDefinition);
  return grpcPackage;
}
