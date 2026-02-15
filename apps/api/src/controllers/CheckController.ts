import { Request, Response } from "express";
import { DetectionService } from "../services/DetectionService";

export class CheckController {
  private detectionService: DetectionService;

  constructor(detectionService: DetectionService) {
    this.detectionService = detectionService;
  }
  checkMessage = (req: Request, res: Response) => {
    const { message, phone, url, platform } = req.body;

    const result = this.detectionService.analyze({
      message,
      phone,
      url,
      platform
    });

    return res.json(result);
  };
}
