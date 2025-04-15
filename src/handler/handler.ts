// src/handler/greeterHandler.ts
export const Greeter = {
  SayHello: (call: any, callback: any) => {
    const { name } = call.request;
    console.log("👋 SayHello called with:", name);
    callback(null, { message: `Hello, ${name}!` });
  },
  SayHi: (call: any, callback: any) => {
    const { name } = call.request;
    console.log("🙋‍♂️ SayHi called with:", name);
    callback(null, { message: `Hi there, ${name}!` });
  },
};
