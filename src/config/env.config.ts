import "dotenv/config";

const envConfig = {
  port: process.env.PORT || 3000,
  groqApiKey: process.env.GROQ_API_KEY,
};

export default envConfig;
