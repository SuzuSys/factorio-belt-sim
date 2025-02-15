import pixelStep from "@/renderers/move";
import { describe, expect, test } from "vitest";
import params from "./params";

describe("pixelStep()", () => {
  test("passes through the function's endpoints", () => {
    expect(pixelStep(params.minBlockSize)).toBeCloseTo(
      params.blockStepAtMin * params.minBlockSize,
      8
    );
    expect(pixelStep(params.maxBlockSize)).toBeCloseTo(
      params.blockStepAtMax * params.maxBlockSize,
      8
    );
  });
});
