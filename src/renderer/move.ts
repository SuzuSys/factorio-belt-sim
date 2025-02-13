import params from "@/renderer/params";

const { minBlockSize, maxBlockSize, velAtMinBlock, velAtMaxBlock } = params;

const velSlope =
  (velAtMaxBlock - velAtMinBlock) / (maxBlockSize - minBlockSize);

/**
 * Get step size from blockSize
 * @param blockSize is positive integer. Range: [params.minBlockSize, params.maxBlockSize]
 * @returns is positive real number.
 */
export default function velocity(blockSize: number) {
  return velSlope * (blockSize - minBlockSize) + velAtMinBlock;
}
