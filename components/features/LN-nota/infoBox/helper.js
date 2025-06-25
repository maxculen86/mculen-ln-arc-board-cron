import get from '../../../private/common/utils/get';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';
import zocaloOptions from './ZocaloConfig';

const VIOLENCE_ZOCALO_KEY = 'violencia-de-genero';

const mapZocaloData = (zocaloData, deployment, contextPath) => {
    if (!zocaloData || Object.keys(zocaloData).length === 0)
        return { showZocalo: false };

    const getPath = getAssetsPath(contextPath)(deployment);

    return {
        showZocalo: true,
        linkProps: {
            href: zocaloData.href,
            title: zocaloData.title,
            ...(zocaloData.target && { target: zocaloData.target })
        },
        imgProps: {
            src: getPath(zocaloData.imgMob),
            alt: zocaloData.imgAlt,
            sources: [
                {
                    minWidth: 768,
                    srcSet: getPath(zocaloData.imgDsk)
                }
            ],
            className: zocaloData.imgClassName,
            width: zocaloData.imgWidth
        },
        logoProps: {
            src: getPath(zocaloData.logo),
            alt: zocaloData.logoAlt,
            className: zocaloData.logoClassName,
            width: zocaloData.logoWidth
        },
        descriptionProps: zocaloData.descriptionProps,
        label: zocaloData.label
    };
};

export const getZocaloAppsProps = (path = '') => {
    if (!path) return null;
    const section = path.split('/');
    const zocaloData = get(zocaloOptions, section[1], undefined);
    if (!zocaloData) return null;

    return {
        _t: 'card',
        id: get(zocaloData, 'label', null)
    };
};

export const getViolenceTagsZocaloProps = (
    deployment,
    contextPath,
    path = ''
) => {
    const violenceZocaloData = get(zocaloOptions, VIOLENCE_ZOCALO_KEY, path);

    return mapZocaloData(violenceZocaloData, deployment, contextPath);
};

export const getZocaloProps = (deployment, contextPath, path = '') => {
    const section = path.split('/')[1] || '';
    const zocaloData = get(zocaloOptions, section, {});
    return mapZocaloData(zocaloData, deployment, contextPath);
};
