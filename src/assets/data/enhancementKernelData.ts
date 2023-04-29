import { TKernelData } from "@type/index";

export const enhancementKernelData: TKernelData[] = [
    {
        id: 'unsharpMasking',
        size: 3,
        matrix: [
          [-1,-1,-1],
          [-1,9,-1],
          [-1,-1,-1]],
        coef: 1
      },
      {
        id: 'unsharpMasking',
        size: 5,
        matrix: [
          [-1,-1,-1,-1,-1],
          [-1,1,2,1,-1],
          [-1,2,4,2,-1],
          [-1,1,2,1,-1],
          [-1,-1,-1,-1,-1]],
        coef: 1
      },
    {
        id: 'unsharpMasking',
        size: 7,
        matrix: [
          [-1,-1,-1,-1,-1,-1,-1],
          [-1,-3,-3,-3,-3,-3,-1],
          [-1,-3,4,4,4,-3,-1],
          [-1,-3,4,8,4,-3,-1],
          [-1,-3,4,4,4,-3,-1],
          [-1,-3,-3,-3,-3,-3,-1],
          [-1,-1,-1,-1,-1,-1,-1]],
        coef: 1
      },
]