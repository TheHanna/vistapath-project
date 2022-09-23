export const getRandomInt = (min: number, max: number) => {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl: string = reader.result as string;
      // const base64: string = dataUrl.split(',').pop() as string;
      resolve(dataUrl);
    };
    reader.readAsDataURL(blob);
  })
}
