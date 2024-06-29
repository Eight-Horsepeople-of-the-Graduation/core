import dotenv from "dotenv";

dotenv.config();

/**
 * Configuration object
 */
export default {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL,
  },
  llmTemperatureValue : 0
};
