import { expect, test } from "vitest";
import params from "@/renderer/params";

// ref: ./README.md

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
