import { TKernelData } from "@type/index";

export const enhancementKernelData: TKernelData[] = [
  {
    id: 'sharpen1',
    size: 3,
    matrix: [
      [0, -1, 0],
      [-1, 5, -1],
      [0, -1, 0]],
    coef: 1
  },
  {
    id: 'sharpen2',
    size: 3,
    matrix: [
      [-1, -1, -1],
      [-1, 9, -1],
      [-1, -1, -1]],
    coef: 1/9
  },
  {
    id: 'sharpen3',
    size: 3,
    matrix: [
      [1, 1, 1],
      [1, -7, 1],
      [1, 1, 1]],
    coef: 1
  },
]