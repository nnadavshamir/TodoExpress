import winston from 'winston';

export let serialRequestNumber = 1;

export const increamentRequestNumber = () => serialRequestNumber++;

export const defaultLoggerFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss.ms' }),
  winston.format.printf(
    (info) =>
      `${info.timestamp} ${info.level.toUpperCase()}: ${
        info.message
      } | request #${serialRequestNumber}`
  )
);
