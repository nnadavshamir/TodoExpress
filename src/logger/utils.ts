import winston from "winston";
import { serialRequestNumber } from "./requests-logger";

export const defaultLoggerFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level.toUpperCase()}: ${info.message} | request #${serialRequestNumber}`
  )
);