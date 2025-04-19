import { sendUnaryData, ServerUnaryCall } from "@grpc/grpc-js";
import { HelloReply, HelloRequest } from "../../generated/hello";

export function sayHelloHandler(
  call: ServerUnaryCall<HelloRequest, HelloReply>,
  callback: sendUnaryData<HelloReply>
) {
  const name = call.request.name;
  const reply: HelloReply = {
    message: `Hello, ${name}!`,
  };

  callback(null, reply);
}
