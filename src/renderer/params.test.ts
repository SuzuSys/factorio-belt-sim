import { expect, test } from "vitest";
import params from "@/renderer/params";

test("satisfy constraints (1)", () => {
  expect(params.minBlockSize).toBeGreaterThanOrEqual(1);
  expect(params.maxBlockSize).toBeGreaterThan(params.minBlockSize);
});
