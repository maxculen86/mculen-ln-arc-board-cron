/* eslint-disable no-underscore-dangle */
import request from 'request-promise-native';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import logger from '../../components/private/common/utils/logger';

const resolve = key => {
    const { website } = key;
    if (!website)
        throw new Error(
            'Debe definir un website para obtener el arbol de navigation'
        );
    return `/site/v3/navigation/${website}/`;
};

const fetch = query => {
    const opt = {
        uri: `${CONTENT_BASE}${resolve(query)}`,
        json: true
    };
    if (ARC_ACCESS_TOKEN) {
        opt.auth = {
            bearer: ARC_ACCESS_TOKEN
        };
    }
    return request(opt)
        .then(response => {
            return transform(response, query);
        })
        .catch(error => {
            logger.push(
                error,
                { source: 'content/source/navigationTreeSource', query },
                query
            );
        });
};

const transform = (data, { sectionId }) => {
    const { ancestors, inactive, order, parent, ...restProps } = data || {};
    // Cuando el source es llamado desde WithNavigation no hace falta devolver mas cosas
    if (sectionId) {
        const sections = sectionId ? getSections(restProps, sectionId) : [];

        return {
            sections,
            Termicas: restProps && restProps.Termicas
        };
    }

    return {
        ...restProps,
        children: []
    };
};

const getSections = (results, sectionId) => {
    const sections = [];
    const sectionList =
        sectionId &&
        sectionId.split('/').map(el => {
            return el ? `/${el}` : '';
        });

    const { _id: id, name } = results;
    const base = id &&
        name && {
            id,
            name,
            path: id
        };

    if (base) {
        sections.push(base);
        if (sectionList) sectionList.shift();
    }

    let section = results;
    if (sectionId && sectionList && sectionList.length) {
        do {
            const primarySectionId = sectionList[0];
            const { children } = section;
            [section] =
                primarySectionId &&
                children &&
                children.filter(el => el._id === primarySectionId);
            if (section) {
                sections.push({
                    id: section._id,
                    name: section.name,
                    path: section._id
                });
                if (sectionList.length >= 2) {
                    sectionList[0] = sectionList[0].concat(sectionList[1]);
                    sectionList.splice(1, 1);
                }
            }
        } while (section);
    }

    return sections;
};

export default {
    cache: true,
    fetch,
    schemaName: 'navigation-tree-schema',
    params: {
        website: 'text'
    },
    ttl: 600
};
