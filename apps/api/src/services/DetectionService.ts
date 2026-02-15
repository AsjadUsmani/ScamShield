import {DetectionEngine, DetectionInput, DetectionResult} from "shared"

export class DetectionService {
  private engine: DetectionEngine;

  constructor() {
    this.engine = new DetectionEngine();
  }

  analyze(input: DetectionInput): DetectionResult {
    return this.engine.analyze(input);
  }
}