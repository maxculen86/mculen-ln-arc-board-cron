import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import ComTitle from '../../private/common/com-title';
import LinkList from '../../private/common/com-link-list';

const NavigationListFeature = ({
    id: featureId,
    customFields: { title, hierarchy } = {}
}) => {
    const { arcSite } = useFusionContext();

    const { children = [] } =
        useContent({
            sourceName: 'navigationSource',
            query: {
                website: arcSite,
                hierarchy
            }
        }) || {};

    const list =
        (children &&
            children.length &&
            children.map(
                ({
                    node_type: nodeType,
                    url,
                    display_name: displayName,
                    _id,
                    name
                }) => {
                    const isLink = nodeType === 'link';
                    return {
                        link: (isLink && url) || _id,
                        textname: (isLink && displayName) || name,
                        title: (isLink && displayName) || name,
                        target: (isLink && '_blank') || ''
                    };
                }
            )) ||
        [];

    return (
        (list && list.length && (
            <Static id={featureId}>
                <section className="mod-linklist">
                    <ComTitle size="--twoxs" content={title} />
                    <LinkList list={list} extraClass="--tags" />
                </section>
            </Static>
        )) ||
        null
    );
};

NavigationListFeature.propTypes = {
    id: PropTypes.string,
    customFields: PropTypes.shape({
        hierarchy: PropTypes.string.tag({
            group: 'Configuración',
            description:
                'Obligatorio. Id de navegación obtenido desde "Site Service".',
            label: 'Id de Navegación'
        }).isRequired,
        title: PropTypes.string.tag({
            group: 'Configuración',
            description: 'Opcional. Título del listado de links.',
            label: 'Título'
        })
    })
};

NavigationListFeature.label = 'LN Common Navigation List';

export default NavigationListFeature;
