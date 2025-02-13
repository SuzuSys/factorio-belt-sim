import { describe, expect, test } from "vitest";
import getBlockSize, { tFunc, yFunc } from "@/renderer/zoom";
import params from "@/renderer/params";

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

describe("yFunc(tFunc()) defined in @/renderer/README.md", () => {
  test("returns a monotonically increasing sequence", () => {
    let prev = yFunc(tFunc(0));
    for (let w = 1; w <= params.lambda; w++) {
      const b = yFunc(tFunc(w));
      expect(b).toBeGreaterThan(prev);
      prev = b;
    }
  });
  test("returns a convex sequence", () => {
    let p1 = yFunc(tFunc(0));
    let p2 = yFunc(tFunc(1));
    for (let w = 2; w <= params.lambda; w++) {
      const p3 = yFunc(tFunc(w));
      expect(p1 + p3).toBeGreaterThanOrEqual(2 * p2);
      [p1, p2] = [p2, p3];
    }
  });
});

describe("getBlockSize() defined in @/renderer/README.md", () => {
  test("passes through the point (x,y)=(0,ymin) and (lambda,ymax)", () => {
    expect(getBlockSize(0)).toEqual(params.minBlockSize);
    expect(getBlockSize(params.lambda)).toEqual(params.maxBlockSize);
  });
});
