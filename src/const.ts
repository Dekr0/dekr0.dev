export const prod = import.meta.env.PROD;
const https = prod ? "https" : "http";
const addr = prod ? import.meta.env.BACKEND_ADDR : "localhost";
export const dataBackend = `${https}://${addr}`;
