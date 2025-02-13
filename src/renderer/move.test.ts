import { describe, expect, test } from "vitest";
import velocity from "./move";
import params from "./params";

describe("velocity()", () => {
  test("passes through the point (minBlockSize, velAtMinBlock) and (maxBlockSize, velAtMaxBlock)", () => {
    expect(velocity(params.minBlockSize)).toBeCloseTo(params.velAtMinBlock, 8);
    expect(velocity(params.maxBlockSize)).toBeCloseTo(params.velAtMaxBlock, 8);
  });
});
