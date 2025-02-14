import getAssetsPath from '../../../private/common/utils/getAssetsPath';
import zocaloOptions from './ZocaloConfig';
import get from '../../../private/common/utils/get';

export const getZocaloProps = (deployment, contextPath, path = '') => {
    if (!path) return { showZocalo: false };
    const section = path.split('/');
    const zocaloData = get(zocaloOptions, section[1], undefined);
    if (!zocaloData) return { showZocalo: false };

    return {
        showZocalo: true,
        linkProps: {
            href: zocaloData.href,
            title: zocaloData.title,
            ...(zocaloData.target && { target: zocaloData.target })
        },
        imgProps: {
            src: getAssetsPath(contextPath)(deployment)(zocaloData.imgMob),
            alt: zocaloData.imgAlt,
            sources: [
                {
                    minWidth: 768,
                    srcSet: getAssetsPath(contextPath)(deployment)(
                        zocaloData.imgDsk
                    )
                }
            ],
            className: zocaloData.imgClassName,
            width: zocaloData.imgWidth
        },
        logoProps: {
            src: getAssetsPath(contextPath)(deployment)(zocaloData.logo),
            alt: zocaloData.logoAlt,
            className: zocaloData.logoClassName,
            width: zocaloData.logoWidth
        },
        description: zocaloData.description,
        label: zocaloData.label
    };
};
