import { TKernelCategory } from "@type/index";
import { filteringKernelInfo } from "@asset/data/filteringKernelInfo";
import { intensityKernelInfo } from "@asset/data/intensityKernelInfo";
import { edgeKernelInfo } from "@asset/data/edgeKernelInfo";
import { segmentationKernelInfo } from "./segmentationKernelInfo";
import { enhancementKernelInfo } from "./enhancementKernelInfo";
import { specialKernelInfo } from "./specialKernelInfo";
import { customKernelInfo } from "./customKernelInfo";

export const kernelCategory: TKernelCategory[] = [
  {
    id: 'filtering',
    label: 'Filtering Kernels',
    infoList: filteringKernelInfo
  },
  {
    id: 'intensity',
    label: 'Intensity Kernels',
    infoList: intensityKernelInfo
  },
  {
    id: 'edge',
    label: 'Edge Kernels',
    infoList: edgeKernelInfo
  },
  {
    id: 'segmentation',
    label: 'Segmentation Kernels',
    infoList: segmentationKernelInfo
  },
  {
    id: 'enhancement',
    label: 'Enhancement Kernels',
    infoList: enhancementKernelInfo
  },
  {
    id: 'special',
    label: 'Special Kernels',
    infoList: specialKernelInfo 
  },
  {
    id: 'custom',
    label: 'Custom Kernels',
    infoList: customKernelInfo
  }
]
