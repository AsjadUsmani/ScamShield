import express, {Express} from "express"
import cors from "cors";

export const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});