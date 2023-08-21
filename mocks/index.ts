const initMocks = async () => {
  if (typeof window === "undefined") {
    //fetch api in server-side
    const { server } = await import("./server");
    server.listen();
  } else {
    //fetch api in client-side
    const { worker } = await import("./browser");
    // worker.start();
    worker.start();
  }
};

initMocks();
