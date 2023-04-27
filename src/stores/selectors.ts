import {
  kernelCategoryDataState,
  selectedCategoryState,
  selectedSizeState,
  selectedKernelState
} from '@store/atoms'
import { TKernelCategory, TKernelData, TKernelInfo } from "@type/index"
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

    // const infoListByCategory: Record<string, TKernelInfo[]> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id
    //   const infoList = category.infoList
    //   infoListByCategory[categoryId] = infoList
    // }) ?? {}

    // const dataListByCategory: Record<string, TData[]> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id
    //   const infoList = infoListByCategory[`${categoryId}`]
    //   const dataList: TData[] = infoList?.flatMap(info => {
    //     return info.dataList.map(data => {
    //       return { info: info, data: data }
    //     })
    //   }) ?? []
    //   dataListByCategory[categoryId] = dataList
    // }) ?? {}

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
      // infoListByCategory,
      // dataListByCategory,
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
    const randIndicesAnim = indicesAnimList[Math.floor(Math.random() * indicesAnimList.length)];


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
    // const matrix2D: number[][] = data?.matrix ?? []
    const matrixCoef1D: number[] = matrix1D.map(val => val * (data?.coef ?? 1))
    // const matrixCoef2D: number[][] = matrix2D.map(row => row.map(val => val * (data?.coef ?? 1)));

    return {
      info,
      data,
      matrix1D,
      matrixCoef1D
    }
  }
})