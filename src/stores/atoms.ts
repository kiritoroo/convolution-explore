import { atom } from "recoil";
import { TKernelCategory, TKernelData, TKernelInfo } from "@type/index";
import * as THREE from 'three'

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: true
})

export const isCollapseVezKernelCategoryState = atom({
  key: 'isCollapseVezKernelCategory',
  default: false  
})

export const isCollapseHozKernelCategoryState = atom({
  key: 'isCollapseHozKernelCategory',
  default: false
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

export const cursorContentState = atom<string>(({
  key: 'cursorContentState',
  default: ''
}))

export const cursorVariantState = atom<string>(({
  key: 'cursorVariantState',
  default: 'default'
}))

export const isFocusKernelInfoState = atom<boolean>(({
  key: 'isFocusKernelInfoState',
  default: false
}))

export const isRenderSceneState = atom<boolean>(({
  key: 'isRenderSceneState',
  default: true
}))

export const resourcesState = atom<Record<string, THREE.Texture>>(({
  key: 'resourcesState',
  default: {}
}))

export const isLoadingResourcesState = atom<boolean>(({
  key: 'isLoadingResourcesState',
  default: true
}))

export const selectedImageTextureState = atom<THREE.Texture | null>(({
  key: 'selectedImageTextureState',
  default: null
}))

export const selectedImageInfoState = atom<{by: string, name: string}>(({
  key: 'selectedImageInfoState',
  default: {
    by: '',
    name: ''
  }
}))

export const isCollapseOptionListState = atom<boolean>(({
  key: 'isCollapseOptionListState',
  default: false
}))

export const colorModeState = atom<string>(({
  key: 'colorModeState',
  default: 'rgb'
}))

export const isPaddingModeState = atom<boolean>(({
  key: 'isPaddingModeState',
  default: false
}))

export const isCollapseVisualState = atom<boolean>(({
  key: 'isCollapseVisualState',
  default: true
}))