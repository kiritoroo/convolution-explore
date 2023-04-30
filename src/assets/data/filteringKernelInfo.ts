import { TColor, TKernelData, TKernelInfo } from "@type/index";
import { filteringKernelData } from "@asset/data/filteringKernelData";
import * as ImageUtils from '@util/ImageUtils'

export const filteringKernelInfo: TKernelInfo[] = [
  {
    id: 'gaussian',
    categoryid: 'filtering',
    label: 'Gaussian Kernel',
    description: 'A Gaussian kernel is a type of kernel function that is commonly used in image processing and computer vision. It is a bell-shaped function that is used to blur or smooth an image, as well as to reduce noise.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    params: [
      'src: Input Image',
      'ksize: Kernel size, it is an odd number'
    ],
    dataList: filteringKernelData.filter(data => data.id === 'gaussian')!
  },
  {
    id: 'averaging',
    categoryid: 'filtering',
    label: 'Averaging Kernel',
    description: 'Averaging kernel is a mathematical function used in signal processing and image processing to determine the contribution of each neighboring pixel in the computation of a processed pixel value.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    params: [
      'src: Input Image',
      'ksize: Kernel size, it is an odd number'
    ],
    dataList: filteringKernelData.filter(data => data.id === 'averaging')!
  },
  {
    id: 'median',
    categoryid: 'filtering',
    label: 'Median Kernel',
    description: 'Averaging kernel is used to remove noise in the image by filtering the median value of the pixels.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math.median(windSliceRed),
        g: Math.median(windSliceGreen),
        b: Math.median(windSliceBlue),
      }
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },  
    params: [
   
    ],
    dataList: filteringKernelData.filter(data => data.id === 'median')!
  }
]