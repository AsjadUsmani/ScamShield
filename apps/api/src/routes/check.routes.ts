import express, { type Router } from "express";
import { CheckController } from "../controllers/CheckController";
import { DetectionService } from "../services/DetectionService";

const router: Router = express.Router();

const detectionService = new DetectionService();
const checkController = new CheckController(detectionService);

router.post("/check-message", checkController.checkMessage);

export default router;
