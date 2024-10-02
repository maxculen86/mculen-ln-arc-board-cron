export const adjustImageDimensions = (
    originalWidth,
    originalHeight,
    newWidth = 1280
) => {
    const scaleFactor = newWidth / Number(originalWidth);
    const newHeight = Math.round(Number(originalHeight) * scaleFactor);

    return { newWidth, newHeight };
};
