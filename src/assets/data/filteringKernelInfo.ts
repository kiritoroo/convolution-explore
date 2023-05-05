import { TColor, TKernelData, TKernelInfo } from "@type/index";
import { filteringKernelData } from "@asset/data/filteringKernelData";
import * as ImageUtils from '@util/ImageUtils'

export const filteringKernelInfo: TKernelInfo[] = [
  {
    id: 'gaussian',
    categoryid: 'filtering',
    label: 'Gaussian Kernel',
    description: 'Gaussian kernel: A kernel used for smoothing or blurring images. It is based on the Gaussian distribution and works by convolving each pixel in an image with a kernel matrix that contains values calculated using the Gaussian function. The resulting image has a smoother appearance and can be used for noise reduction, edge detection, and other image processing tasks.',
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
    dataList: filteringKernelData.filter(data => data.id === 'gaussian')!
  },
  {
    id: 'averaging',
    categoryid: 'filtering',
    label: 'Averaging Kernel',
    description: 'Averaging kernel: A kernel used for simple image smoothing or blurring. It is also called a box filter because the kernel has a rectangular shape with all values set to 1. The kernel is applied to each pixel in the image by computing the average of the pixel values in the kernel neighborhood. The resulting image has reduced high-frequency noise and small details, but may also have reduced contrast and sharpness.',
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
    dataList: filteringKernelData.filter(data => data.id === 'averaging')!
  },
  {
    id: 'median',
    categoryid: 'filtering',
    label: 'Median Kernel',
    description: 'Median kernel: A kernel used for image denoising or smoothing. It replaces each pixel in the image with the median value of its neighboring pixels. The median filter is useful for removing salt-and-pepper noise, which is a type of noise that appears as white or black pixels scattered randomly throughout the image. The median kernel is robust to outliers and preserves edges and details better than other smoothing filters.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math.median(windSliceRed),
        g: Math.median(windSliceGreen),
        b: Math.median(windSliceBlue),
      }
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },  
    dataList: filteringKernelData.filter(data => data.id === 'median')!
  },
  {
    id: 'min',
    categoryid: 'filtering',
    label: 'Min Kernel',
    description: 'A min kernel is a type of spatial filter used in image processing to perform morphological operations such as erosion. It works by replacing each pixel in an image with the minimum value in its neighborhood defined by a kernel, which is a small matrix of values. The size of the kernel determines the size of the neighborhood used for the operation. The min kernel is useful for removing small details or noise in an image, as it reduces the intensity of bright pixels and fills in small gaps in the image.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math.min(...windSliceRed),
        g: Math.min(...windSliceGreen),
        b: Math.min(...windSliceBlue),
      }
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },  
    dataList: filteringKernelData.filter(data => data.id === 'min')!
  },
  {
    id: 'max',
    categoryid: 'filtering',
    label: 'Max Kernel',
    description: 'The max kernel, also known as dilation kernel, is a morphological operation in image processing used to enlarge the boundaries of regions of foreground pixels. It replaces each pixel in the image with the maximum pixel value within the kernel size neighborhood centered at that pixel. The resulting image will have thicker and more pronounced edges and borders.',
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math.max(...windSliceRed),
        g: Math.max(...windSliceGreen),
        b: Math.max(...windSliceBlue),
      }
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },  
    dataList: filteringKernelData.filter(data => data.id === 'max')!
  }
]