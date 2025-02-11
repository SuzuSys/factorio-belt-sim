import params from "./params";

// Desmos graph: https://www.desmos.com/calculator/hrtfe5027m

const { lambda, minBlockSize, maxBlockSize, slopeA, slopeB } = params;

const xmid =
  (lambda * slopeB + minBlockSize - maxBlockSize) / (slopeB - slopeA);
const ymid = slopeA * xmid + minBlockSize;
const condition =
  lambda < (2 * (maxBlockSize - minBlockSize)) / (slopeA + slopeB);
const hFunc = xmid / (lambda - 2 * xmid);

function yFunc(x: number) {
  function tFunc(x: number) {
    const sqr = Math.sqrt(x / (lambda - 2 * xmid) + Math.pow(hFunc, 2));
    return -hFunc + (condition ? sqr : -sqr);
  }
  const t = tFunc(x);
  return Math.pow(t, 2) * (maxBlockSize - 2 * minBlockSize) + 2 * t * ymid;
}

export default function getBlockSize(wheelPos: number) {
  return Math.round(yFunc(wheelPos));
}
