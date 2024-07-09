import { createLogger, format, transports, addColors } from "winston";
const { colorize, combine, printf, timestamp } = format;
const { Console, File } = transports;

// Define custom colors for different log levels
addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "blue",
  verbose: "cyan",
  silly: "magenta",
});

// Define a custom log format to match NestJS console output style
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

// Create a logger instance
const logger = createLogger({
  level: "debug", // Set the default log level
  format: combine(
    timestamp({
      format: "DD-MM-YYYY HH:mm:ss",
    }),
    logFormat // Apply the custom log format
  ),
  transports: [
    new Console({
      format: combine(
        colorize({
          all: true, // Apply color to all levels
        }),
        logFormat // Apply the custom log format with colors
      ),
    }),
    new File({
      filename: "logs/error.log",
      level: "error", // Only log 'error' level messages to this file
      format: combine(
        timestamp({
          format: "DD-MM-YYYY HH:mm:ss",
        }),
        format.printf(
          ({ level, message, timestamp }) =>
            `[${timestamp}] [${level}] ${message}`
        )
      ),
    }),
    new File({
      filename: "logs/all.log",
      format: combine(
        timestamp({
          format: "DD-MM-YYYY HH:mm:ss",
        }),
        format.printf(
          ({ level, message, timestamp }) =>
            `[${timestamp}] [${level}] ${message}`
        )
      ),
    }),
  ],
});

export default logger;
