import params from "@/renderer/params";

const { minBlockSize, maxBlockSize, velAtMinBlock, velAtMaxBlock } = params;

const velSlope =
  (velAtMaxBlock - velAtMinBlock) / (maxBlockSize - minBlockSize);

export default function velocity(blockSize: number) {
  return velSlope * (blockSize - minBlockSize) + velAtMinBlock;
}
