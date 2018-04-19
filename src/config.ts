const config = {
  SERVER_HOST: process.env.SERVER_HOST || "127.0.0.1",
  SERVER_PORT: Number(process.env.SERVER_PORT) || 10000,
  DATA: 'Hello, world',
  SEND_INTERVAL: 1000
}

export { config }