import React from 'react';
import { parse } from 'node-html-parser';
import get from './get';

const attributeMap = {
    class: 'className',
    for: 'htmlFor',
    autoplay: 'autoPlay',
    srcset: 'srcSet',
    crossorigin: 'crossOrigin',
    spellcheck: 'spellCheck',
    autocomplete: 'autoComplete'
};

const domToReact = nodes => {
    if (!Array.isArray(nodes)) return null;

    return nodes.map((node, index) => {
        const nodeType = get(node, 'nodeType');

        if (nodeType === 3) return get(node, 'rawText', '');

        if (nodeType === 1) {
            const tagName = get(node, 'tagName', '').toLowerCase();
            const attributes = get(node, 'attributes', {});
            const childNodes = get(node, 'childNodes', []);
            const props = { key: index };

            Object.keys(attributes).forEach(attr => {
                const propName = attributeMap[attr.toLowerCase()] || attr;
                props[propName] = attributes[attr] || get(attributes, attr);
            });

            return React.createElement(tagName, props, domToReact(childNodes));
        }

        return null;
    });
};

export const parseHtml = html => {
    if (typeof html !== 'string' || !html) return null;

    try {
        const root = parse(`<span>${html}</span>`);
        const wrapperChildren = get(root, 'childNodes.0.childNodes');
        return wrapperChildren ? domToReact(wrapperChildren) : html;
    } catch (error) {
        console.error('Error en parseHelper.js => parseHtml:', error);
        return html;
    }
};

export const parseHeading = html => {
    if (typeof html !== 'string' || !html) return null;
    try {
        const root = parse(`<div>${html}</div>`);

        const stripNonAnchorTags = node => {
            if (!node.childNodes) return;

            let i = 0;
            while (i < node.childNodes.length) {
                const child = node.childNodes[i];
                const tagName = child.tagName?.toLowerCase();

                if (tagName && tagName !== 'a') {
                    stripNonAnchorTags(child);
                    const newChildren = child.childNodes || [];
                    node.childNodes.splice(i, 1, ...newChildren);
                    i += newChildren.length;
                } else {
                    stripNonAnchorTags(child);
                    i += 1;
                }
            }
        };

        stripNonAnchorTags(root);
        const wrapperChildren = get(root, 'childNodes');
        return wrapperChildren ? domToReact(wrapperChildren) : html;
    } catch (error) {
        console.error('Error en parseHelper.js => parseHeading:', error);
        return html;
    }
};
