/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import handleCookie from '../../LN/common/utils/handleCookie';
import createHash from '../utils/createHash';

const formatExpression = text =>
    'ca_'.concat(
        text
            .toLowerCase()
            .normalize('NFD')
            .replace('/', '')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\W/g, '_')
    );

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
        ? content.Payload.items.map(item => 'te_'.concat(item.slug))
        : [];

const getAuthor = content => (content.slug ? ['au_'.concat(content.slug)] : []);

function GooglePublisherTagAcumulado(props) {
    const { globalContent } = props;
    const { contextPath, deployment } = useAppContext();
    const { type, parent, ancestors, name } = globalContent;

    if (type === 'story') return null;

    const category = getCategories(name, parent, ancestors);

    const topic = getTopic(globalContent);

    const author = getAuthor(globalContent);

    const { getCookie } = handleCookie();

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
                data-new-tags={JSON.stringify([
                    ...category,
                    ...topic,
                    ...author
                ])}
                data-create-hash={createHash.toString()}
                data-get-cookie={getCookie.toString()}
                src={deployment(
                    `${contextPath}/resources/js/LN/googlePublisherTagAcumulado.min.js`
                )}
            />
        </>
    );
}

export default GooglePublisherTagAcumulado;
