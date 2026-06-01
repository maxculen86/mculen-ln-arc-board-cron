import PropTypes from 'fusion:prop-types';
import get from '../../../private/common/utils/get';
import getAssetsPath from '../../../private/common/utils/getAssetsPath';
import zocaloOptions from './ZocaloConfig';

export const groupNames = [
    'Violencia de genero',
    'Abuso',
    'Bullying',
    'Suicidio',
    'Generico'
];

export const getSuffix = groupName => (groupName ?? '').replace(/\s+/g, '-');

export const getMatchedZocaloGroup = (groups, customFields, tags) =>
    groups
        .map(group => {
            const suffix = getSuffix(group);
            const tagListKey = `tagList-${suffix}`;
            const linkKey = `link-${suffix}`;

            const tagList = customFields[tagListKey] || [];
            const link = customFields[linkKey] || '';

            const hasMatch = tags.some(tag => tagList.includes(tag.slug));

            if (hasMatch) {
                return { group, tagList, link };
            }

            return null;
        })
        .find(Boolean) || null;

export const getZocaloConfigKeyFromGroup = groupName => {
    const suffix = getSuffix(groupName).toLowerCase();

    const directKey = suffix;
    const prefixedKey = `hablemos-de-${suffix}`;

    if (zocaloOptions[directKey]) return directKey;
    if (zocaloOptions[prefixedKey]) return prefixedKey;

    return 'generico';
};

export const generateGroupedCustomFieldsPropTypes = groups =>
    groups.reduce((acc, groupName) => {
        const keySuffix = getSuffix(groupName);

        acc[`tagList-${keySuffix}`] = PropTypes.list.tag({
            label: 'Tag',
            group: groupName
        });

        acc[`link-${keySuffix}`] = PropTypes.string.tag({
            name: 'Enlace Personalizado',
            description: 'Introduzca tags para mostrar el enlace de este campo',
            defaultValue: '',
            group: groupName
        });

        return acc;
    }, {});

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
        media: zocaloData.media,
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
    groupName
) => {
    const configKey = getZocaloConfigKeyFromGroup(groupName);
    const violenceZocaloData = get(zocaloOptions, configKey, {});
    return mapZocaloData(violenceZocaloData, deployment, contextPath);
};

export const getZocaloProps = (deployment, contextPath, path = '') => {
    const section = path.split('/')[1] || '';
    const zocaloData = get(zocaloOptions, section, {});
    return mapZocaloData(zocaloData, deployment, contextPath);
};
