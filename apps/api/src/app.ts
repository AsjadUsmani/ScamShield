import express from "express";
import cors from "cors";
import checkRoutes from "./routes/check.routes";

export const app: express.Express = express();

app.use(cors({
  credentials: true,
  methods: ['*'],
}));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", checkRoutes);
