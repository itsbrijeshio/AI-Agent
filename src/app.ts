import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
const cookieParser = require("cookie-parser")
import routes from "./routes";

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser())
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Groq AI!");
});

app.use("/api", routes);

export default app;
