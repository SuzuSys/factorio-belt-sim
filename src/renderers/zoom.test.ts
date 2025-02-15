import { describe, expect, test } from "vitest";
import getBlockSize, { tFunc, yFunc } from "@/renderers/zoom";
import params from "@/renderers/params";

// ref: ./README.md

describe("tFunc() defined in @/renderer/README.md", () => {
  test("passes through the point (x,t)=(0,0) and (lambda,1)", () => {
    expect(tFunc(0)).toBeCloseTo(0, 8);
    expect(tFunc(params.lambda)).toBeCloseTo(1, 8);
  });
});

describe("yFunc() defined in @/renderer/README.md", () => {
  test("passes through the point (t,y)=(0,ymin) and (1,ymax)", () => {
    expect(yFunc(0)).toBeCloseTo(params.minBlockSize, 8);
    expect(yFunc(1)).toBeCloseTo(params.maxBlockSize, 8);
  });
});

describe("getBlockSize() defined in @/renderer/README.md", () => {
  test("passes through the point (x,y)=(0,ymin) and (lambda,ymax)", () => {
    expect(getBlockSize(0)).toEqual(params.minBlockSize);
    expect(getBlockSize(params.lambda)).toEqual(params.maxBlockSize);
  });
  test("returns a monotonically increasing sequence", () => {
    let prev = getBlockSize(0);
    for (let w = 1; w <= params.lambda; w++) {
      const b = getBlockSize(w);
      expect(b).toBeGreaterThan(prev);
      prev = b;
    }
  });
  test("returns a convex sequence", () => {
    let p1 = getBlockSize(0);
    let p2 = getBlockSize(1);
    for (let w = 2; w <= params.lambda; w++) {
      const p3 = getBlockSize(w);
      expect(p1 + p3).toBeGreaterThanOrEqual(2 * p2);
      [p1, p2] = [p2, p3];
    }
  });
});
