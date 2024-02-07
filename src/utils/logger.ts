import pino from "pino";
import type { Logger } from "pino";

let logger: undefined | Logger;

export default function getLogger(): Logger {
    if (!logger) {
        logger = initLogger();
    }

    return logger;
}

function initLogger(): Logger {
    logger = pino({
        level: import.meta.env.PINO_LEVEL || "info",
    });

    return logger;
}

