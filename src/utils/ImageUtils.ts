export const getDataTexture = (image: any): ImageData => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext("2d");
  canvas.width = image.width;
  canvas.height = image.height;
  ctx?.drawImage(image, 0, 0)
  return ctx?.getImageData(0, 0, image.width, image.height)!;
}

export const rgb2Gray = (r: number, g: number, b: number): number => {
  const grayValue = 0.2989 * r + 0.5870 * g + 0.1140 * b;
  return Math.floor(grayValue);
}