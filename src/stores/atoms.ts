import { atom } from "recoil";
import { TKernelCategory } from "@type/index";

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false
})

export const isCollapseVezKernelCategoryState = atom({
  key: 'isCollapseVezKernelCategory',
  default: true
})

export const isCollapseHozKernelCategoryState = atom({
  key: 'isCollapseHozKernelCategory',
  default: true
})

export const kernelCategoryDataState = atom<TKernelCategory[] | null>({
  key: 'kernelCategoryDataState',
  default: []
})