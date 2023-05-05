import { TColor, TKernelInfo } from "@type/index";
import { edgeKernelData } from "@asset/data/edgeKernelData";
import * as ImageUtils from '@util/ImageUtils'

export const edgeKernelInfo: TKernelInfo[] = [
  {
    id: "sobel-gx",
    categoryid: "edge",
    label: "Sobel Gx Kernel",
    description: "Sobel kernel includes Sobel X and Sobel Y, designed to detect edges in the horizontal and vertical orientation of an image.",
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    dataList: edgeKernelData.filter((data) => data.id === "sobel-gx")!,
  },
  {
    id: "sobel-gy",
    categoryid: "edge",
    label: "Sobel Gy Kernel",
    description: "Sobel kernel includes Sobel X and Sobel Y, designed to detect edges in the horizontal and vertical orientation of an image.",
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    dataList: edgeKernelData.filter((data) => data.id === "sobel-gy")!,
  },
  {
    id: "laplacian",
    categoryid: "edge",
    label: "Laplacian Kernel",
    description: "The Laplacian kernel is a type of image filter used in computer vision and image processing. It is a second derivative operator that highlights regions of rapid intensity change in an image, such as edges, corners, and other features.",
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    dataList: edgeKernelData.filter((data) => data.id === "laplacian")!,
  },
  {
    id: "freichen-gx",
    categoryid: "edge",
    label: "Frei - Chen Gx Kernel",
    description: "Frei-Chen kernel is a type of filter used for detecting edges in images. It consists of two separate kernels, Gx and Gy, which are applied separately to the image to detect edges in the horizontal and vertical directions. These kernels are designed to calculate the gradient of the image by detecting changes in pixel values.",
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    dataList: edgeKernelData.filter((data) => data.id === "freichen-gx")!,
  },
  {
    id: "freichen-gy",
    categoryid: "edge",
    label: "Frei - Chen Gy Kernel",
    description: "Frei-Chen kernel is a type of filter used for detecting edges in images. It consists of two separate kernels, Gx and Gy, which are applied separately to the image to detect edges in the horizontal and vertical directions. These kernels are designed to calculate the gradient of the image by detecting changes in pixel values.",
    func: (windSliceRed: number[], windSliceGreen: number[], windSliceBlue: number[], ksize: number, kmatrix: number[]): { outRGB: TColor, outGray: number } => {
      const outRGB: TColor = {
        r: Math
        .mularr(windSliceRed, kmatrix)
        .reduce((acc, value) => acc + value, 0),
        g: Math
          .mularr(windSliceGreen, kmatrix)
          .reduce((acc, value) => acc + value, 0),
        b: Math
          .mularr(windSliceBlue, kmatrix)
          .reduce((acc, value) => acc + value, 0),
      }          
      
      const outGray: number = ImageUtils.rgb2Gray( outRGB.r, outRGB.g, outRGB.b )

      return { outRGB: outRGB, outGray: outGray }
    },
    dataList: edgeKernelData.filter((data) => data.id === "freichen-gy")!,
  },
  // {
  //   id: "prewittgx",
  //   categoryid: "edge",
  //   label: "PrewittGx Kernel",
  //   description:
  //     "Prewitt kernel includes Prewitt X and Prewitt Y, also designed for edge detection in horizontal and vertical orientation of images, however Prewitt kernel has higher sensitivity for diagonal edges.",
  //   params: [],
  //   dataList: edgeKernelData.filter((data) => data.id === "prewittgx")!,
  // },
  // {
  //   id: "prewittgy",
  //   categoryid: "edge",
  //   label: "PrewittGy Kernel",
  //   description:
  //     "Prewitt kernel: includes Prewitt X and Prewitt Y, also designed for edge detection in horizontal and vertical orientation of images, however Prewitt kernel has higher sensitivity for diagonal edges.",
  //   code: "",
  //   params: [],
  //   dataList: edgeKernelData.filter((data) => data.id === "prewittgy")!,
  // },
  // {
  //   id: "robertsCrossgx",
  //   categoryid: "edge",
  //   label: "RobertsCrossGx Kernel",
  //   description:
  //     "Roberts Cross kernel: includes Robert Cross X and Robert Cross Y, designed to detect edges in diagonal direction of images.",
  //   code: "",
  //   params: [],
  //   dataList: edgeKernelData.filter((data) => data.id === "robertsCrossgx")!,
  // },
  // {
  //   id: "robertsCrossgy",
  //   categoryid: "edge",
  //   label: "RobertsCrossGy Kernel",
  //   description:
  //     "Roberts Cross kernel: includes Robert Cross X and Robert Cross Y, designed to detect edges in diagonal direction of images.",
  //   code: "",
  //   params: [],
  //   dataList: edgeKernelData.filter((data) => data.id === "robertsCrossgy")!,
  // },
  //   {
  //       id: 'emboss',
  //       categoryid: 'edge',
  //       label: 'Emboss Kernel',
  //       description: 'This type of kernel is used to create an immersive effect for the image, making it look like a photograph has been etched on a surface.',
  //       code: '',
  //       params: [
       
  //       ],
  //       dataList: edgeKernelData.filter(data => data.id === 'emboss')!
  //     },
  // {
  //   id: "laplacian",
  //   categoryid: "edge",
  //   label: "Laplacian Kernel",
  //   description:
  //     "Laplacian kernel: designed to detect rapid changes in the brightness level at a pixel, thereby detecting image features such as edges, floating points, etc.",
  //   code: "",
  //   params: [],
  //   dataList: edgeKernelData.filter((data) => data.id === "laplacian")!,
  // },
];
