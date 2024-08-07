import dotenv from "dotenv";

dotenv.config();

/**
 * Configuration object
 */
export default {
  port: process.env.PORT || 3001,
  db: {
    url: process.env.DB_URL,
  },
  llmTemperatureValue: 0,
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: 1000 * 60 * 15, // 15 minutes
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: 1000 * 60 * 60 * 24 * 7 * 4, // 4 weeks
  },
  cookieSecret: process.env.COOKIE_SECRET,
  origin: process.env.ORIGIN,
};
