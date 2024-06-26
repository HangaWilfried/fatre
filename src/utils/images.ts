export const convertToBlob = (file: File): Blob => {
  return new Blob([file], { type: file.type });
};
