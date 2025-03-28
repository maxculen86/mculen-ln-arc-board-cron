import { getAspectRatio } from '../../../../../../../content/sources/utils/getRatio';

export const setHeight = (width, height, proportion) => {
    const [axisX, axisY] = proportion.split(':');

    return axisX > axisY ? parseInt((width / axisX) * axisY, 10) : height;
};
const setFilter = (thumbor, [type, value]) =>
    thumbor.filter(`${type}(${value})`);

export const setStrFocal = (x = 5, y = 5) =>
    `${x - 5}x${y + 5}:${x + 5}x${y - 5}`;

export const setCropMethod = ({
    thumbor,
    resizeOptions,
    originalWidth,
    originalHeight,
    focalPoint,
    smartCropExcluded
}) => {
    const { proportion, isNotSmart } = resizeOptions;
    if (proportion) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const notEqualProportion = aspectRatio !== proportion;

        if (notEqualProportion) {
            const [focalX, focalY] = focalPoint;
            const hasFocalPoint = focalPoint.length === 2;
            const hasAnyDimensions = originalWidth || originalHeight;

            if (hasFocalPoint && hasAnyDimensions && isNotSmart) {
                const focalFilter = setStrFocal(focalX, focalY);
                setFilter(thumbor, ['focal', focalFilter]);
            } else if (!smartCropExcluded) {
                thumbor.smartCrop(true);
            }
        }
    }
};

export const updateHeight = (originalHeight, originalWidth, opt = {}) => {
    const { proportion } = opt;
    if (!proportion && originalWidth < originalHeight) {
        const aspectRatio = getAspectRatio(originalWidth, originalHeight);
        const [axisXX, axisYY] = aspectRatio.split(':');

        return parseInt((opt.width / axisXX) * axisYY, 10);
    }
    return opt.height;
};
