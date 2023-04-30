import { TKernelData } from "@type/index";

export const edgeKernelData: TKernelData[] = [
    {
        id: 'sobelgx',
        size: 3,
        matrix: [
          [-1,0,1],
          [-2,0,2],
          [-1,0,1]],
        coef: 1
      },
      {
        id: 'sobelgy',
        size: 3,
        matrix: [
          [-1,-2,-1],
          [0,0,0],
          [1,2,1]],
        coef: 1
      },
      {
        id: 'sobelgx',
        size: 5,
        matrix: [
            [-1, -2, 0, 2, 1],
            [-4, -8, 0, 8, 4],
            [-6, -12, 0, 12, 6],
            [-4, -8, 0, 8, 4],
            [-1, -2, 0, 2, 1]],
        coef: 1
      },
      {
        id: 'sobelgy',
        size: 5,
        matrix: [
            [-1, -4, -6, -4, -1],
            [-2, -8, -12, -8, -2],
            [0, 0, 0, 0, 0],
            [2, 8, 12, 8, 2],
            [1, 4, 6, 4, 1]],
        coef: 1
      },
      {
        id: 'sobelgx',
        size: 7,
        matrix: [
            [-1, -1, -1, 0, 1, 1, 1],
            [-2, -2, -2, 0, 2, 2, 2],
            [-3, -3, -3, 0, 3, 3, 3],
            [-4, -4, -4, 0, 4, 4, 4],
            [-3, -3, -3, 0, 3, 3, 3],
            [-2, -2, -2, 0, 2, 2, 2],
            [-1, -1, -1, 0, 1, 1, 1]],
        coef: 1
      },
      {
        id: 'sobelgy',
        size: 7,
        matrix: [
            [-1, -2, -3, -4, -3, -2, -1],
            [-1, -2, -3, -4, -3, -2, -1],
            [-1, -2, -3, -4, -3, -2, -1],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 2, 3, 4, 3, 2, 1],
            [1, 2, 3, 4, 3, 2, 1],
            [1, 2, 3, 4, 3, 2, 1]],
        coef: 1
      },
      {
        id: 'prewittgx',
        size: 3,
        matrix: [
            [-1,0,1],
            [-1,0,1],
            [-1,0,1]],
        coef: 1
      },
      {
        id: 'prewittgy',
        size: 3,
        matrix: [
          [-1,-1,-1],
          [0,0,0],
          [1,1,1]],
        coef: 1
      },
      {
        id: 'prewittgx',
        size: 5,
        matrix: [
            [-2, -1, 0, 1, 2],
            [-2, -1, 0, 1, 2],
            [-4, -2, 0, 2, 4],
            [-2, -1, 0, 1, 2],
            [-2, -1, 0, 1, 2]],
        coef: 1
      },
      {
        id: 'prewittgy',
        size: 5,
        matrix: [
            [-2, -2, -4, -2, -2],
            [-1, -1, -2, -1, -1],
            [0, 0, 0, 0, 0],
            [1, 1, 2, 1, 1],
            [2, 2, 4, 2, 2]],
        coef: 1
      },
      {
        id: 'prewittgx',
        size: 7,
        matrix: [
            [-3, -2, -1, 0, 1, 2, 3],
            [-3, -2, -1, 0, 1, 2, 3],
            [-3, -2, -1, 0, 1, 2, 3],
            [-5, -4, -3, 0, 3, 4, 5],
            [-3, -2, -1, 0, 1, 2, 3],
            [-3, -2, -1, 0, 1, 2, 3],
            [-3, -2, -1, 0, 1, 2, 3]],
        coef: 1
      },
      {
        id: 'prewittgy',
        size: 7,
        matrix: [
            [-3, -3, -3, -5, -3, -3, -3],
            [-2, -2, -2, -4, -2, -2, -2],
            [-1, -1, -1, -3, -1, -1, -1],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 3, 1, 1, 1],
            [2, 2, 2, 4, 2, 2, 2],
            [3, 3, 3, 5, 3, 3, 3]],
        coef: 1
      },
      {
        id: 'robertsCrossgx',
        size:2,
        matrix: [
          [1,0],
          [0,-1]],
        coef: 1
      },
      {
        id: 'robertsCrossgx',
        size:3,
        matrix: [
            [-1,0,1],
            [-2,0,2],
            [-1,0,1]],
        coef: 1
      },
      {
        id: 'robertsCrossgy',
        size:2,
        matrix: [
          [0,1],
          [-1,0]],
        coef: 1
      },
      {
        id: 'robertsCrossgy',
        size:3,
        matrix: [
            [-1,-2,-1],
            [0,0,0],
            [1,2,1]],
        coef: 1
      },
      {
        id: 'emboss',
        size: 3,
        matrix: [
           [-2,-1,0],
           [-1,1,1],
           [0,1,2]],
        coef: 1
      },
      {
        id: 'emboss',
        size: 5,
        matrix: [
           [-1, -1, -1, -1, 0],
           [-1, -1, -1, 0, 1],
           [-1, -1, 0, 1, 1],
           [-1, 0, 1, 1, 1],
           [0, 1, 1, 1, 1]],
        coef: 1
      },
      {
        id: 'emboss',
        size: 7,
        matrix: [
            [-4,-3,-2,-1,0,1,2],
            [-3,-2,-1,0,1,2,3],
            [-2,-1,0,1,2,3,4],
            [-1,0,1,2,3,4,5,],
            [0,1,2,3,4,5,6],
            [1,2,3,4,5,6,7],
            [2,3,4,5,6,7,8]],
        coef: 1
       },
      {
        id: 'laplacian',
        size: 3,
        matrix: [
          [0,1,0],
          [1,-4,1],
          [0,1,0]],
        coef: 1
      },
      {
        id: 'laplacian',
        size: 5,
        matrix: [
          [0,0,1,0,0],
          [0,1,2,1,0],
          [1,2,-16,2,1],
          [0,1,2,1,0],
          [0,0,1,0,0]],
        coef: 1
      },
      {
        id: 'laplacian',
        size: 7,
        matrix: [
            [0, 0, -1, -1, -1, 0, 0],
            [0, -2, -3, -3, -3, -2, 0],
            [-1, -3, 0, 7, 0, -3, -1],
            [-1, -3, 7, 24, 7, -3, -1],
            [-1, -3, 0, 7, 0, -3, -1],
            [0, -2, -3, -3, -3, -2, 0],
            [0, 0, -1, -1, -1, 0, 0]],
        coef: 1
      },
]
