import {
  kernelCategoryDataState
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

    // const dataCountById: Record<string, number> = {};
    // categoryList?.forEach(category => {
    //   const categoryId = category.id;
    //   const dataCount = category.infoList.reduce((count, info) => count + info.dataList.length, 0);
    //   dataCountById[categoryId] = dataCount;
    // }) ?? {}

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

    const dataListBySizeObjByCategory: Record<string, {[key: string]: TData[] }> = {};
    categoryList?.forEach(category => {
      const categoryId = category.id
      const dataList = dataListByCategory[`${categoryId}`]
      const dataBySize = dataList.reduce((acc: {[key: string]: TData[]}, data) => {
        const size = data.data.size;
        if (!acc[size]) {
          acc[size] = [];
        }
        acc[size].push(data);
        return acc;
      }, {});

      dataListBySizeObjByCategory[categoryId] = dataBySize;
    }) ?? {}

    return {
      categoryList,
      dataCount,
      // dataCountById,
      infoListByCategory,
      dataListByCategory,
      // dataListByInfoByCategory,
      // dataListBySizeByCategory,
      dataListBySizeObjByCategory
    }
  }
})
