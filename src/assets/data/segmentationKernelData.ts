import { TKernelData } from "@type/index";

export const segmentationKernelData: TKernelData[] = [
    {
        id: 'meanShift',
        size: 3,
        matrix: [
          [1,1,1],
          [1,1,1],
          [1,1,1]],
        coef: 1/9
      },
      {
        id: 'meanShift',
        size: 5,
        matrix: [
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1]],
        coef: 1/25
      },
      {
        id: 'meanShift',
        size: 7,
        matrix: [
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1]],
        coef: 1/49
      },
    {
        id: 'watershed',
        size: 3,
        matrix: [
          [1,1,1],
          [1,1,1],
          [1,1,1]],
        coef: 1
      },
    {
        id: 'watershed',
        size: 5,
        matrix: [
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1],
          [1,1,1,1,1]],
        coef: 1
      },
    {
        id: 'watershed',
        size: 7,
        matrix: [
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1]],
        coef: 1
      },
]