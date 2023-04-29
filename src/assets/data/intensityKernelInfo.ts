import { TKernelInfo } from "@type/index";
import { intensityKernelData } from "@asset/data/intensityKernelData";

export const intensityKernelInfo: TKernelInfo[] = [
    {
        id: 'contrastEnhancement',
        categoryid: 'intensity',
        label: 'Contrast Enhancement Kernel ',
        description: 'Contrast enhancement, used to increase the contrast of an image by increasing the brightness of the light pixels and decreasing the brightness of the dark pixels.',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'contrastEnhancement')!
      },
    {
        id: 'brightnessReduction',
        categoryid: 'intensity',
        label: 'Brightness Reduction Kernel ',
        description: 'Brightness reduction kernel, used to reduce the brightness of an image by reducing the intensity value of the pixels.',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'brightnessReduction')!
      },
      {
        id: 'brightnessEnhancement',
        categoryid: 'intensity',
        label: 'Brightness Enhancement Kernel ',
        description: 'Brightness enhancement kernel, used to increase the brightness of an image by increasing the intensity value of the pixels',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'brightnessEnhancement')!
      },
      {
        id: 'gammaCorrection',
        categoryid: 'intensity',
        label: 'Gamma Correction Kernel ',
        description: 'Gamma Correction kernel,used to adjust the brightness and contrast of the image using the gamma factor.',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'gammaCorrection')!
      },
    {
        id: 'blur',
        categoryid: 'intensity',
        label: 'Blur Kernel',
        description: 'This type of kernel is used to blur images, remove noise, and reduce image sharpness.',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'blur')!
      },
      // {
      //   id: 'dilate',
      //   categoryid: 'intensity',
      //   label: 'Dilate Kernel',
      //   description: 'This type of kernel is used to enlarge objects in an image.',
      //   code: '',
      //   params: [
       
      //   ],
      //   dataList: intensityKernelData.filter(data => data.id === 'dilate')!
      // },
      // {
      //   id: 'erode',
      //   categoryid: 'intensity',
      //   label: 'Erode Kernel',
      //   description: 'This type of kernel is used to shrink objects in the image.',
      //   code: '',
      //   params: [
       
      //   ],
      //   dataList: intensityKernelData.filter(data => data.id === 'erode')!
      // },
      {
        id: 'sharpen',
        categoryid: 'intensity',
        label: 'Sharpen Kernel',
        description: 'This type of kernel is used to sharpen the image and increase the sharpness of the objects in the image.',
        code: '',
        params: [
       
        ],
        dataList: intensityKernelData.filter(data => data.id === 'sharpen')!
      },
]
