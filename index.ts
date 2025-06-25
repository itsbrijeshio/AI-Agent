import app from "./src/app";
import { envConfig, connectDB } from "./src/config";

const PORT = envConfig.port;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
