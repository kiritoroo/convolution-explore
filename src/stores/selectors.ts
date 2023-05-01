import {
  kernelCategoryDataState,
  selectedCategoryState,
  selectedSizeState,
  selectedKernelState,
  selectedImageTextureState
} from '@store/atoms'
import { TColor, TColorAlpha, TKernelCategory, TKernelData, TKernelInfo } from "@type/index";
import * as ImageUtils from '@util/ImageUtils'
import { selector } from 'recoil'

interface TData {
  info: TKernelInfo
  data: TKernelData
}

interface TDataByInfo {
  info: TKernelInfo,
  data: TKernelData[]
}

interface TDataBySize {
  size: number,
  data: TData[]
}

export const kernelCategoryDataSelector = selector({
  key: 'kernelCategoryDataSelector',
  get: ({get}) => {
    const categoryList: TKernelCategory[] | null = get(kernelCategoryDataState) 
    const dataCount: number[] = categoryList?.map((category) => {
      const dataCount = category.infoList.reduce((count, info) => count + info.dataList.length, 0);
      return dataCount
    }) ?? []

    const dataCountById: Record<string, number> = {};
    categoryList?.forEach(category => {
      const categoryId = category.id;
      const dataCount = category.infoList.reduce((count, info) => count + info.dataList.length, 0);
      dataCountById[categoryId] = dataCount;
    }) ?? {}

    const infoListByCategory: Record<string, TKernelInfo[]> = {};
    categoryList?.forEach(category => {
      const categoryId = category.id
      const infoList = category.infoList
      infoListByCategory[categoryId] = infoList
    }) ?? {}

    const dataListByCategory: Record<string, TData[]> = {};
    categoryList?.forEach(category => {
      const categoryId = category.id
      const infoList = infoListByCategory[`${categoryId}`]
      const dataList: TData[] = infoList?.flatMap(info => {
        return info.dataList.map(data => {
          return { info: info, data: data }
        })
      }) ?? []
      dataListByCategory[categoryId] = dataList
    }) ?? {}

    let dataListBySize: Record<string, TKernelData[]> = categoryList?.reduce((acc: Record<string, TKernelData[]>, category) => {
      category.infoList.forEach(info => {
        info.dataList.forEach(data => {
          const size = data.size;
          if (!acc[size]) {
            acc[size] = [];
          }
          acc[size].push(data);
        });
      });
      return acc;
    }, {}) ?? {}

    // const dataListByInfoByCategory: Record<string, TDataByInfo[]> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id
    //   const dataList = dataListByCategory[`${categoryId}`]
    //   const dataListByInfo: TDataByInfo[] = dataList.reduce<TDataByInfo[]>((result, current) => {
    //     const { info, data } = current;
    //     const existingInfo = result.find((item) => item.info.id === info.id);
    //     if (existingInfo) {
    //       existingInfo.data.push(data);
    //     } else {
    //       result.push({ info, data: [data] });
    //     }
    //     return result;
    //   }, []);
    //   dataListByInfoByCategory[categoryId] = dataListByInfo
    // }) ?? {}

    // const dataListBySizeByCategory: Record<string, TDataBySize[]> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id
    //   const dataList = dataListByCategory[`${categoryId}`]
    //   const dataBySize = dataList.reduce((acc: {[key: number]: TData[]}, data) => {
    //     const size = data.data.size;
    //     if (!acc[size]) {
    //       acc[size] = [];
    //     }
    //     acc[size].push(data);
    //     return acc;
    //   }, {});
    //   dataListBySizeByCategory[categoryId] = []
    //   for (const [size, data] of Object.entries(dataBySize)) {
    //     dataListBySizeByCategory[categoryId].push({ size: parseInt(size), data: data });
    //   }
    // }) ?? {}

    // const dataListBySizeObjByCategory: Record<string, {[key: string]: TData[] }> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id
    //   const dataList = dataListByCategory[`${categoryId}`]
    //   const dataBySize = dataList.reduce((acc: {[key: string]: TData[]}, data) => {
    //     const size = data.data.size;
    //     if (!acc[size]) {
    //       acc[size] = [];
    //     }
    //     acc[size].push(data);
    //     return acc;
    //   }, {});

    //   dataListBySizeObjByCategory[categoryId] = dataBySize;
    // }) ?? {}

    return {
      categoryList,
      dataCount,
      dataCountById,
      dataListBySize,
      infoListByCategory,
      dataListByCategory,
      // dataListByInfoByCategory,
      // dataListBySizeByCategory,
      // dataListBySizeObjByCategory
    }
  }
})

export const selectedCategorySelector = selector({
  key: 'selectedCategorySelector',
  get: ({get}) => {
    const category: TKernelCategory | null = get(selectedCategoryState)
    const infoList: TKernelInfo[] | null = category?.infoList ?? null
    const dataList: TData[] = infoList?.flatMap(info => {
      return info.dataList.map(data => {
        return { info: info, data: data }
      })
    }) ?? []

    // const dataListByInfo: TDataByInfo[] = dataList.reduce<TDataByInfo[]>((result, current) => {
    //   const { info, data } = current;
    //   const existingInfo = result.find((item) => item.info.id === info.id);
    //   if (existingInfo) {
    //     existingInfo.data.push(data);
    //   } else {
    //     result.push({ info, data: [data] });
    //   }
    //   return result;
    // }, []);

    const dataListBySize: TDataBySize[] = [];
    const dataBySize = dataList.reduce((acc: {[key: number]: TData[]}, data) => {
      const size = data.data.size;
      if (!acc[size]) {
        acc[size] = [];
      }
      acc[size].push(data);
      return acc;
    }, {});
    for (const [size, data] of Object.entries(dataBySize)) {
      dataListBySize.push({ size: parseInt(size), data: data });
    }

    const dataListBySizeObj: Record<string, TData[]> = dataList.reduce((acc: {[key: string]: TData[]}, data) => {
      const size = data.data.size;
      if (!acc[size]) {
        acc[size] = [];
      }
      acc[size].push(data);
      return acc;
    }, {});


    // const infoCount: number = infoList?.length ?? 0
    // const dataCount: number = dataList.length ?? 0
    const sizeList: number[] = dataListBySize.map((item) => item.size)

    return {
      category,
      // dataList,
      sizeList,
      // dataListByInfo,
      dataListBySize,
      dataListBySizeObj,
      // infoCount,
      // dataCount
    }
  }
})

export const selectedSizeSelector = selector({
  key: 'selectedSizeSelector',
  get: ({get}) => {
    const size: number | undefined = get(selectedSizeState)
    // const indicesSync: number[] = []
    const indicesCross: number[] = size ? Math.getIndicesByDistance(size, 0, 0, true) : []
    const indices1DCenter2Outside: number[] = size ? Math.indices1DCenter2Outside(size, size) : []
    const indices1DOutside2Center: number[] = size ? Math.indices1DOutsideCenter(size, size) : []
    // const indices2DCenter2Outside: number[][] = size ? Math.indices2DCenter2Outside(size, size) : []
    // const indices2DOutsideCenter: number[][] = size ? Math.indices2DOutsideCenter(size, size) : []
    const indicesAnimList = [
      indicesCross,
      indices1DCenter2Outside,
      indices1DOutside2Center
    ]
    const randIndicesAnim = size == 3 
      ? indicesCross : size == 5 
      ? indices1DOutside2Center 
      : indices1DCenter2Outside

    return {
      size,
      randIndicesAnim
    }
  }
})

export const selectedKernelSelector = selector({
  key: 'selectedKernelSelector',
  get: ({get}) => {
    const kernel: TData | null = get(selectedKernelState)
    const info: TKernelInfo | null = kernel?.info ?? null
    const data: TKernelData | null = kernel?.data ?? null
    const matrix1D: number[] = data?.matrix.flat() ?? []
    const matrix2D: number[][] = data?.matrix ?? []
    const matrixCoef1D: number[] = matrix1D.map(val => val * (data?.coef ?? 1))
    // const matrixCoef2D: number[][] = matrix2D.map(row => row.map(val => val * (data?.coef ?? 1)));
    const maxValue: number = Math.maxOfMatrix(matrix2D)

    return {
      info,
      data,
      matrix1D,
      matrixCoef1D,
      maxValue
    }
  }
})

export const selectedImageInputSelector = selector(({
  key: 'selectedImageInputSelector',
  get: ({get}) => {
    const texture: THREE.Texture | null = get(selectedImageTextureState)
    const data: ImageData | null = texture ? ImageUtils.getDataTexture(texture.image) : null
    const w: number = data?.width ?? 0
    const h: number = data?.height ?? 0
    const pixelCount: number = w * h
    const rgba1d: Uint8ClampedArray = data?.data ?? new Uint8ClampedArray(pixelCount*4)
    const rgba2d: TColorAlpha[][] = []
    const rgb1d: Uint8ClampedArray = new Uint8ClampedArray(pixelCount*3)
    const rgb2d: TColor[][] = []
    const cRed1d: Uint8ClampedArray = new Uint8ClampedArray(pixelCount);
    const cRed2d: number[][] = []
    const cGreen1d: Uint8ClampedArray = new Uint8ClampedArray(pixelCount);
    const cGreen2d: number[][] = []
    const cBlue1d: Uint8ClampedArray = new Uint8ClampedArray(pixelCount);
    const cBlue2d: number[][] = []
    const gray1d: Uint8ClampedArray = new Uint8ClampedArray(pixelCount);
    const gray2d: number[][] = []

    for (let y = 0; y < h; y++) {
      const _rowRgba: TColorAlpha[] = []
      const _rowRgb: TColor[] = []
      const _rowRed: number[] = []
      const _rowGreen: number[] = []
      const _rowBlue: number[] = []
      const _rowGray: number[] = []

      for (let x = 0; x < w; x++) {
        const index1d = (y * w + x)
        const _r = rgba1d[index1d * 4];
        const _g = rgba1d[index1d * 4 + 1];
        const _b = rgba1d[index1d * 4 + 2];
        const _a = rgba1d[index1d * 4 + 3];
        const _gray = ImageUtils.rgb2Gray(_r, _g, _b);
        
        rgba1d[index1d * 3] = _r;
        rgba1d[index1d * 3 + 1] = _g;
        rgba1d[index1d * 3 + 2] = _b;
        cRed1d[index1d] = _r;
        cGreen1d[index1d] = _g;
        cBlue1d[index1d] = _b;
        gray1d[index1d] = _gray;

        _rowRgba.push({ r: _r, g: _g, b: _b, a: _a })
        _rowRgb.push({ r: _r, g: _g, b: _b })
        _rowRed.push(_r)
        _rowGreen.push(_g)
        _rowBlue.push(_b)
        _rowGray.push(_gray)
      }
      rgba2d.push(_rowRgba)
      rgb2d.push(_rowRgb)
      cRed2d.push(_rowRed)
      cGreen2d.push(_rowGreen)
      cBlue2d.push(_rowBlue)
      gray2d.push(_rowGray)
    }

    return {
      texture,
      data,
      w, h,
      pixelCount,
      rgba1d, rgba2d,
      rgb1d, rgb2d,
      cRed1d, cRed2d,
      cGreen1d, cGreen2d,
      cBlue1d, cBlue2d,
      gray1d, gray2d
    }
  }
}))

export const selectedImageOutputSelector = selector(({
  key: 'selectedImageOutputSelector',
  get: ({get}) => {
    const kernel = get(selectedKernelSelector)
    const imageIn = get(selectedImageInputSelector)
    const kernelSize = kernel.data?.size ?? 0
    const w = imageIn.w
    const h = imageIn.h
    const pixelCount = imageIn.pixelCount
    const rgb1dOut: TColor[] = Array(pixelCount).fill({ r: 255, g: 255, b:255 });
    const rgb2dOut: TColor[][] = Array.from({length: h}, () => Array(w).fill({ r: 255, g: 255, b:255 }));
    const gray1dOut: Uint8ClampedArray = new Uint8ClampedArray(imageIn.pixelCount)
    const gray2dOut: number[][] = Array.from({length: h}, () => Array(w).fill(255));

    if (imageIn.data) {
      for (let y = 0; y < imageIn.h - (kernelSize - 1); y++) {
        for (let x = 0; x < imageIn.h - (kernelSize - 1); x++) {
          
          const windowSliceInRed: number[] = [];
          const windowSliceInGreen: number[] = [];
          const windowSliceInBlue: number[] = [];

          for (let ky = 0; ky < kernelSize ?? 1; ky++) {
            for (let kx = 0; kx < kernelSize ?? 1; kx++) {
              const index = (y + ky) * imageIn.w + (x + kx);
              windowSliceInRed.push(imageIn.cRed1d[index])
              windowSliceInGreen.push(imageIn.cGreen1d[index])
              windowSliceInBlue.push(imageIn.cBlue1d[index])
            }
          }

          const result = kernel.info?.func(
            windowSliceInRed, windowSliceInGreen, windowSliceInBlue, kernel.data!.size, kernel.matrixCoef1D
          )

          const windowSliceOutColor = result?.outRGB ?? { r: 255, g: 255, b:255 };
          const windowSliceOutGray = result?.outGray ?? 255;

          const indexOut2D = {
            x: x + Math.floor(kernelSize/2),
            y: y + Math.floor(kernelSize/2)
          }

          const indexOut1D = indexOut2D.y * imageIn.w + indexOut2D.x;

          rgb1dOut[indexOut1D] = windowSliceOutColor;
          rgb2dOut[indexOut2D.y][indexOut2D.x] = windowSliceOutColor;
          gray1dOut[indexOut1D] = windowSliceOutGray;
          gray2dOut[indexOut2D.y][indexOut2D.x] = windowSliceOutGray;
        }
      }
    }

    return{
      w, h, pixelCount,
      rgb1dOut, rgb2dOut,
      gray1dOut, gray2dOut
    }
  }
}))