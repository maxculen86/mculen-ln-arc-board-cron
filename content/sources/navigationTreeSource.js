/* eslint-disable no-underscore-dangle */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';
import { handleHttpError } from '../../components/private/common/utils/handleHttpError';
import get from '../../components/private/common/utils/get';

const buildNavigationApiPath = key => {
    const { website } = key;
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );
    return `/site/v3/navigation/${website}/`;
};

const parseSectionIdIntoPaths = sectionId =>
    sectionId && sectionId.split('/').map(el => (el ? `/${el}` : ''));

const buildNavigationBreadcrumb = (navigationData, sectionId = '') => {
    const breadcrumbSections = [];
    const sectionPaths = parseSectionIdIntoPaths(sectionId);
    const rootId = get(navigationData, '_id');
    const rootName = get(navigationData, 'name');

    const rootSection = rootId &&
        rootName && {
            id: rootId,
            name: rootName,
            path: rootId
        };

    if (rootSection) {
        breadcrumbSections.push(rootSection);
        if (sectionPaths) {
            sectionPaths.shift();
        }
    }

    let currentSection = navigationData;
    if (sectionId && sectionPaths && sectionPaths.length) {
        do {
            const targetSectionId = sectionPaths[0];
            const childSections = get(currentSection, 'children');
            [currentSection] =
                targetSectionId &&
                childSections &&
                childSections.filter(el => get(el, '_id') === targetSectionId);

            if (currentSection) {
                breadcrumbSections.push({
                    id: get(currentSection, '_id'),
                    name: get(currentSection, 'name'),
                    path: get(currentSection, '_id')
                });
            }

            if (currentSection && sectionPaths.length >= 2) {
                sectionPaths[0] = sectionPaths[0].concat(sectionPaths[1]);
                sectionPaths.splice(1, 1);
            }
        } while (currentSection);
    }

    return breadcrumbSections;
};

const transformNavigationDataForConsumer = (apiData, { sectionId }) => {
    const { ancestors, inactive, order, parent, ...navigationContent } =
        apiData || {};

    if (sectionId) {
        const breadcrumbSections = sectionId
            ? buildNavigationBreadcrumb(navigationContent, sectionId)
            : [];

        return {
            sections: breadcrumbSections,
            Termicas: navigationContent && navigationContent.Termicas
        };
    }

    return {
        ...navigationContent,
        children: []
    };
};

const fetch = async query => {
    const navigationApiPath = buildNavigationApiPath(query);

    const requestOptions = {
        method: 'GET'
    };
    if (ARC_ACCESS_TOKEN) {
        requestOptions.headers = {
            Authorization: `Bearer ${ARC_ACCESS_TOKEN}`
        };
    }

    return global
        .fetch(`${CONTENT_BASE}${navigationApiPath}`, requestOptions)
        .then(response => {
            handleHttpError(response);
            return response.json();
        })
        .then(navigationApiData =>
            transformNavigationDataForConsumer(navigationApiData, query)
        )
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/navigationTreeSource', query },
                query
            );
            return undefined;
        });
};

export default {
    cache: true,
    fetch,
    schemaName: 'navigation-tree-schema',
    params: {
        website: 'text',
        sectionId: 'text'
    },
    ttl: 600
};
