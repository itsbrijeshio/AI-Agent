import "dotenv/config";

const envConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  mongoDb: process.env.MONGO_DB,
  groqApiKey: process.env.GROQ_API_KEY,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "accessTokenSecret",
  accessTokenExpire: process.env.ACCESS_TOKEN_EXPIRE || "3",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "refreshTokenSecret",
  refreshTokenExpire: process.env.REFRESH_TOKEN_EXPIRE || "30",
};

export default envConfig;
