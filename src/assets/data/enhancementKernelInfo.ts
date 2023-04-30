import { TColor, TKernelInfo } from "@type/index";
import { enhancementKernelData } from "@asset/data/enhancementKernelData";

export const enhancementKernelInfo: TKernelInfo[] = [
    {
        id: 'unsharpMasking',
        categoryid: 'enhancement',
        label: 'Unsharp Masking Kernel',
        description: 'Unsharp masking kernel is a type of image processing kernel used to increase the sharpness of an image. It is used to increase contrast and reduce blur in an image.',
        func: (windSliceRed: TColor[], windSliceGreen: TColor[], windSliceBlue: TColor[], ksize: number): { outRGB: TColor, outGray: number } => {
            
        },
        params: [
        ],
        dataList: enhancementKernelData.filter(data => data.id === 'unsharpMasking')!
    }
]