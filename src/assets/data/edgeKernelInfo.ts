import { TKernelInfo } from "@type/index";
import { edgeKernelData } from "@asset/data/edgeKernelData";

export const edgeKernelInfo: TKernelInfo[] = [
    {
        id: 'sobelgx',
        categoryid: 'edge',
        label: 'SobelGx Kernel',
        description: 'Sobel kernel includes Sobel X and Sobel Y, designed to detect edges in the horizontal and vertical orientation of an image.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'sobelgx')!
    },
    {
        id: 'sobelgy',
        categoryid: 'edge',
        label: 'SobelGy Kernel',
        description: 'Sobel kernel includes Sobel X and Sobel Y, designed to detect edges in the horizontal and vertical orientation of an image.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'sobelgy')!
    },
    {
        id: 'prewittgx',
        categoryid: 'edge',
        label: 'PrewittGx Kernel',
        description: 'Prewitt kernel includes Prewitt X and Prewitt Y, also designed for edge detection in horizontal and vertical orientation of images, however Prewitt kernel has higher sensitivity for diagonal edges.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'prewittgx')!
    },
    {
        id: 'prewittgy',
        categoryid: 'edge',
        label: 'PrewittGy Kernel',
        description: 'Prewitt kernel: includes Prewitt X and Prewitt Y, also designed for edge detection in horizontal and vertical orientation of images, however Prewitt kernel has higher sensitivity for diagonal edges.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'prewittgy')!
    },
    {
        id: 'robertsCrossgx',
        categoryid: 'edge',
        label: 'RobertsCrossGx Kernel',
        description: 'Roberts Cross kernel: includes Robert Cross X and Robert Cross Y, designed to detect edges in diagonal direction of images.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'robertsCrossgx')!
    },
    {
        id: 'robertsCrossgy',
        categoryid: 'edge',
        label: 'RobertsCrossGy Kernel',
        description: 'Roberts Cross kernel: includes Robert Cross X and Robert Cross Y, designed to detect edges in diagonal direction of images.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'robertsCrossgy')!
    },
    {
        id: 'emboss',
        categoryid: 'edge',
        label: 'Emboss Kernel',
        description: 'This type of kernel is used to create an immersive effect for the image, making it look like a photograph has been etched on a surface.',
        code: '',
        params: [
       
        ],
        dataList: edgeKernelData.filter(data => data.id === 'emboss')!
      },
    {
        id: 'laplacian',
        categoryid: 'edge',
        label: 'Laplacian Kernel',
        description: 'Laplacian kernel: designed to detect rapid changes in the brightness level at a pixel, thereby detecting image features such as edges, floating points, etc.',
        code: '',
        params: [
      
        ],
        dataList: edgeKernelData.filter(data => data.id === 'laplacian')!
    }

    ]