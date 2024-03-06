export const prod = import.meta.env.PROD;
const https = prod ? "https" : "http";
const addr = prod ? import.meta.env.BACKEND_ADDR : "localhost";
const port = prod ? import.meta.env.PUBLIC_BACKEND_PORT : 8000;
export const dataBackend = `${https}://${addr}:${port}`;
