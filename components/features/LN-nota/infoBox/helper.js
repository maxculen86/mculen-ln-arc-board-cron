import getAssetsPath from '../../../private/common/utils/getAssetsPath';

export const getZocaloProps = (
    {
        href,
        title,
        target,
        rel,
        label,
        imgDsk,
        imgMob,
        imgAlt,
        imgClassName,
        logo,
        logoAlt,
        logoClassName,
        description,
    },
    deployment,
    contextPath,
) => {
    const linkProps = { href, title, target, rel };
    const buttonProps = { href, title, label };
    const imgProps = {
        src: getAssetsPath(contextPath)(deployment)(imgMob),
        alt: imgAlt,
        sources: [
            {
                minWidth: 768,
                srcSet: getAssetsPath(contextPath)(deployment)(imgDsk),
            },
        ],
        className: imgClassName,
    };
    const logoProps = {
        src: getAssetsPath(contextPath)(deployment)(logo),
        alt: logoAlt,
        className: logoClassName,
    };
    return { linkProps, buttonProps, imgProps, logoProps, description };
};
