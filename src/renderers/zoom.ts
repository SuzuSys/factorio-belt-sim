import params from "@/renderers/params";

// Desmos graph: https://www.desmos.com/calculator/hrtfe5027m

const { lambda, minBlockSize, maxBlockSize, slopeA, slopeB } = params;

const xmid =
  (lambda * slopeB + minBlockSize - maxBlockSize) / (slopeB - slopeA);
const condition =
  lambda < (2 * (maxBlockSize - minBlockSize)) / (slopeA + slopeB);
const hFunc = xmid / (lambda - 2 * xmid);

export function tFunc(x: number) {
  const sqr = Math.sqrt(x / (lambda - 2 * xmid) + Math.pow(hFunc, 2));
  return -hFunc + (condition ? sqr : -sqr);
}

export function yFunc(t: number) {
  return (
    Math.pow(t, 2) * (maxBlockSize - minBlockSize - 2 * slopeA * xmid) +
    2 * t * slopeA * xmid +
    minBlockSize
  );
}

/**
 * Get BlockSize from wheelPos
 * @param wheelPos is positive integer. Range: [0, params.lambda]
 * @returns is positive real number. Range: [params.minBlockSize, params.maxBlockSize]
 */
export default function getBlockSize(wheelPos: number) {
  return yFunc(tFunc(wheelPos));
}
