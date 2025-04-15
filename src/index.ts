import { grpcClients, startGrpcServer } from "./grpc";
import express from "express";
import { Greeter } from "./handler/handler";

const app = express();
const PORT = 3000;

// Start gRPC server with handlers
startGrpcServer({ Greeter });

// Express route to test gRPC call
app.get("/test", (req, res) => {
  const greeterClient = grpcClients.Greeter;

  greeterClient.SayHello({ name: "TestUser" }, (err: any, response: any) => {
    if (err) {
      console.error("gRPC Error:", err);
      return res.status(500).send("Error calling gRPC");
    }

    res.send(`gRPC responded: ${response.message}`);
  });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🌐 Express server running at http://localhost:${PORT}`);
});
