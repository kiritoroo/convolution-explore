import { TKernelInfo } from "@type/index";
import { specialKernelData } from "@asset/data/specialKernelData";

export const specialKernelInfo: TKernelInfo[] = [
      {
        id: 'dilation',
        categoryid: 'special',
        label: 'Dilate Kernel',
        description: 'This type of kernel is used to enlarge objects in an image.',
        code: '',
        params: [
       
        ],
        dataList: specialKernelData.filter(data => data.id === 'dilation')!
      },
      {
        id: 'erosion',
        categoryid: 'special',
        label: 'Erosion Kernel',
        description: 'This type of kernel is used to shrink objects in the image.',
        code: '',
        params: [
       
        ],
        dataList: specialKernelData.filter(data => data.id === 'erosion')!
      }
]