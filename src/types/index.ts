export interface TKernelCategory {
  id: string,
  label: string,
  infoList: TKernelInfo[]
}

export interface TKernelInfo {
  id: string;
  categoryid: string;
  label: string;
  description: string;
  func: (
    windSliceRed: number[], 
    windSliceGreen: number[], 
    windSliceBlue: number[], 
    ksize: number,
    kmatrix: number[]
  ) => { outRGB: TColor, outGray: number };
  params: string[]
  dataList: TKernelData[]
}

export interface TKernelData {
  id: string,
  size: number
  matrix: number[][]
  coef: number
}

export interface TAsset {
  name: string
  type: 'image'
  path: string
}

export interface TColorAlpha {
  r: number,
  g: number,
  b: number,
  a: number
}

export interface TColor {
  r: number,
  g: number,
  b: number
}
