import { atom } from "recoil";
import { TKernelCategory, TKernelData, TKernelInfo } from "@type/index";

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

export const selectedCategoryState = atom<TKernelCategory | null>(({
  key: 'selectedCategoryState',
  default: null
}))


export const selectedSizeState = atom<number | undefined>(({
  key: 'selectedSizeState',
  default: undefined
}))

export const selectedKernelState = atom<{ info: TKernelInfo, data: TKernelData } | null>(({
  key: 'selecterKernelState',
  default: null
}))