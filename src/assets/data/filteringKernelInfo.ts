import { TKernelInfo } from "@type/index";
import { filteringKernelData } from "@asset/data/filteringKernelData";

export const filteringKernelInfo: TKernelInfo[] = [
  {
    id: 'gaussian',
    categoryid: 'filtering',
    label: 'Gaussian Kernel',
    description: 'A Gaussian kernel is a type of kernel function that is commonly used in image processing and computer vision. It is a bell-shaped function that is used to blur or smooth an image, as well as to reduce noise.',
    code: 'cv2.GaussianBlur(src, ksize)',
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
    code: 'cv2.blur(src, ksize)',
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
    code: '',
    params: [
   
    ],
    dataList: filteringKernelData.filter(data => data.id === 'median')!
  }
]