import { describe, expect, test } from "vitest";
import params from "@/renderer/params";

describe("params defined in @renderer/README.md#Zoom", () => {
  test("satisfy constraints (1)", () => {
    expect(params.minBlockSize).toBeGreaterThanOrEqual(1);
    expect(params.maxBlockSize).toBeGreaterThan(params.minBlockSize);
  });

  test("satisfy constraints (2)", () => {
    expect(params.slopeA).toBeGreaterThan(0);
    expect(params.slopeB).toBeGreaterThan(params.slopeA);
  });

  test("satisfy constraints (3)", () => {
    const dif = params.maxBlockSize - params.minBlockSize;
    expect(params.lambda).toBeGreaterThan(dif / params.slopeB);
    expect(params.lambda).toBeLessThan(dif / params.slopeA);
  });

  test("lambda, minBlockSize, and maxBlockSize are integers", () => {
    expect(Number.isInteger(params.lambda)).toBe(true);
    expect(Number.isInteger(params.minBlockSize)).toBe(true);
    expect(Number.isInteger(params.maxBlockSize)).toBe(true);
  });
});
