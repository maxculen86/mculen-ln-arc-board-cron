import { FOTOAL100 } from '../../../../common/utils/subtypes/subtypeHelper';

const setClassCondition = ({
    subtype,
    withZoom,
    active,
    isApertura,
    insideBody,
    withMobileImage,
    isVertical
}) => {
    const isFotoAl100 = subtype.id === FOTOAL100;
    const isZoomActive = withZoom && active;
    const notFotoAl100AperturaInsideBody = !(
        isApertura ||
        isFotoAl100 ||
        insideBody
    );

    if (
        withMobileImage ||
        (isVertical && (notFotoAl100AperturaInsideBody || isZoomActive))
    )
        return '--vertical';

    return !insideBody ? '--horizontal' : '';
};

export default setClassCondition;
