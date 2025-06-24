import app from "./src/app";
import { envConfig } from "./src/config";

const PORT = envConfig.port;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
