import { createLogger, format, Logger, transports } from "winston";

const { combine, prettyPrint, printf, timestamp } = format;

const logger: Logger = createLogger({
  level: "debug",
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    prettyPrint()
  ),
  transports: [
    new transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
    new transports.Console(),
  ],
});

export default logger;
