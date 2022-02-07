/* eslint-disable react/require-default-props */

import React from 'react';
import PropTypes from 'prop-types';

const formatExpression = text => {
    return 'ca_'.concat(
        text
            .toLowerCase()
            .normalize('NFD')
            .replace('/', '')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\W/g, '_')
    );
};

const getCategories = (name, parent, ancestors) => {
    const { default: defaultParent } = parent || {};
    const { default: defaultAncestors } = ancestors || {};
    const actualCategory = name ? [formatExpression(name)] : [];
    const parentCategory = defaultParent &&
        defaultParent !== '/' && [formatExpression(defaultParent)];
    const ancestorsCategorys =
        defaultAncestors &&
        defaultAncestors.length > 1 &&
        defaultAncestors.slice(1).map(anc => {
            const treeCategory = anc.split('/');
            return formatExpression(treeCategory[treeCategory.length - 1]);
        });

    if (ancestorsCategorys) return actualCategory.concat(ancestorsCategorys);
    if (parentCategory) return actualCategory.concat(parentCategory);
    return actualCategory;
};

const getTopic = content =>
    content.Payload && content.Payload.items && content.Payload.items.length > 0
        ? content.Payload.items.map(item => 'te_'.concat(item.name))
        : [];

const getAuthor = content => (content.slug ? ['au_'.concat(content.slug)] : []);

const googlePublisherTagAcumulado = props => {
    const { globalContent } = props;
    const { type, parent, ancestors, name } = globalContent;

    if (type === 'story') return null;

    const category = getCategories(name, parent, ancestors);

    const topic = getTopic(globalContent);

    const author = getAuthor(globalContent);

    const script = `
            var pbjs = pbjs || {};
            pbjs.que = pbjs.que || [];
            
            (window.googletag = window.googletag || { cmd: [] });
                googletag.cmd.push(function() {
                    googletag.pubads().setTargeting('tags_nuevos', ${JSON.stringify(
                        [...category, ...topic, ...author]
                    )});
                    googletag.pubads().setTargeting('seccion', 'acumulado');
                    //googletag.pubads().setTargeting('adstest', testQueryString());
                    googletag.pubads().setTargeting('sitio', 'lanacion');
                }
            )
    `;

    return (
        <>
            <script
                async
                src=" https://securepubads.g.doubleclick.net/tag/js/gpt.js?network-code=133919216"
            />
            <script
                async
                id="googlePublisherTag-metadata"
                type="text/javascript"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: script }}
            />
        </>
    );
};

googlePublisherTagAcumulado.propTypes = {
    globalContent: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        parent: PropTypes.shape({
            default: PropTypes.string
        }),
        ancestors: PropTypes.shape({
            default: PropTypes.arrayOf(PropTypes.string)
        })
    }).isRequired
};

export default googlePublisherTagAcumulado;
