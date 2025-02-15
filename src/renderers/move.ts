import params from "@/renderers/params";

const { minBlockSize, maxBlockSize, blockStepAtMin, blockStepAtMax } = params;

const stepAtMin = blockStepAtMin * minBlockSize;
const stepAtMax = blockStepAtMax * maxBlockSize;

const velSlope = (stepAtMax - stepAtMin) / (maxBlockSize - minBlockSize);

/**
 * Get step size from blockSize
 * @param blockSize is positive real number. Range: [params.minBlockSize, params.maxBlockSize]
 * @returns is positive integer.
 */
export default function pixelStep(blockSize: number) {
  return Math.round(velSlope * (blockSize - minBlockSize) + stepAtMin);
}
