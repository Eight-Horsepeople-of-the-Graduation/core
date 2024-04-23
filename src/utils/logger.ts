import { createLogger, format, transports } from "winston";
const { colorize, combine, prettyPrint, simple, timestamp } = format;
const { Console, File } = transports;

const winstonFormat = combine(
  timestamp({
    format: "DD-MM-YYYY HH:mm:ss",
  }),
  prettyPrint()
);

const winstonTransports = [
  new Console({
    format: combine(winstonFormat, colorize({ all: true })),
  }),
  new File({
    filename: "logs/error.log",
    level: "error",
    format: combine(winstonFormat, prettyPrint()),
  }),
  new File({
    filename: "logs/all.log",
    format: combine(winstonFormat, prettyPrint()),
  }),
];

const logger = createLogger({
  format: winstonFormat,
  transports: winstonTransports,
});

export default logger;
