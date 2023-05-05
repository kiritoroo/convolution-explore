import { TColor, TKernelInfo } from "@type/index";
import { intensityKernelData } from "@asset/data/intensityKernelData";
import * as ImageUtils from '@util/ImageUtils'

export const intensityKernelInfo: TKernelInfo[] = [
  {
    id: 'linear-constrast',
    categoryid: 'intensity',
    label: 'Linear Constrast Kernel',
    description: '',
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
    dataList: intensityKernelData.filter(data => data.id === 'linear-constrast')!
  },
    // {
    //     id: 'contrastEnhancement',
    //     categoryid: 'intensity',
    //     label: 'Contrast Enhancement Kernel ',
    //     description: 'Contrast enhancement, used to increase the contrast of an image by increasing the brightness of the light pixels and decreasing the brightness of the dark pixels.',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'contrastEnhancement')!
    //   },
    // {
    //     id: 'brightnessReduction',
    //     categoryid: 'intensity',
    //     label: 'Brightness Reduction Kernel ',
    //     description: 'Brightness reduction kernel, used to reduce the brightness of an image by reducing the intensity value of the pixels.',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'brightnessReduction')!
    //   },
    //   {
    //     id: 'brightnessEnhancement',
    //     categoryid: 'intensity',
    //     label: 'Brightness Enhancement Kernel ',
    //     description: 'Brightness enhancement kernel, used to increase the brightness of an image by increasing the intensity value of the pixels',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'brightnessEnhancement')!
    //   },
    //   {
    //     id: 'gammaCorrection',
    //     categoryid: 'intensity',
    //     label: 'Gamma Correction Kernel ',
    //     description: 'Gamma Correction kernel,used to adjust the brightness and contrast of the image using the gamma factor.',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'gammaCorrection')!
    //   },
    // {
    //     id: 'blur',
    //     categoryid: 'intensity',
    //     label: 'Blur Kernel',
    //     description: 'This type of kernel is used to blur images, remove noise, and reduce image sharpness.',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'blur')!
    //   },
    //   {
    //     id: 'sharpen',
    //     categoryid: 'intensity',
    //     label: 'Sharpen Kernel',
    //     description: 'This type of kernel is used to sharpen the image and increase the sharpness of the objects in the image.',
    //     code: '',
    //     params: [
       
    //     ],
    //     dataList: intensityKernelData.filter(data => data.id === 'sharpen')!
    //   }
]
