import { TKernelData } from "@type/index";

export const specialKernelData: TKernelData[] = [
    {
        id: 'dilation',
        size: 3,
        matrix: [
          [0,1,0],
          [1,1,1],
          [0,1,0]],
        coef: 1
      },
    {
        id: 'dilation',
        size: 5,
        matrix: [
          [0,0,1,0,0],
          [0,1,1,1,0],
          [1,1,1,1,1],
          [0,1,1,1,0],
          [0,0,1,0,0]],
        coef: 1
      },
      {
        id: 'dilation',
        size: 7,
        matrix: [
          [0,0,0,1,0,0,0],
          [0,0,1,1,1,0,0],
          [0,1,1,1,1,1,0],
          [1,1,1,1,1,1,1],
          [0,1,1,1,1,1,0],
          [0,0,1,1,1,0,0],
          [0,0,0,1,0,0,0]],
        coef: 1
      },
    {
        id: 'erosion',
        size: 3,
        matrix: [
          [1,1,1],
          [0,0,0],
          [1,1,1]],
        coef: 1
      },
    {
        id: 'erosion',
        size: 5,
        matrix: [
          [1,1,1,1,1],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [1,1,1,1,1]],
        coef: 1
      },
    {
        id: 'erosion',
        size: 7,
        matrix: [
          [1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0],
          [1,1,1,1,1,1,1]],
        coef: 1
      }
]