/* eslint-disable no-console */
/* eslint-disable react/no-danger */
import React from 'react';
import get from './get';

export const productClickFromServer = () => {
    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: `
                    window.addEventListener('DOMContentLoaded', () => {
                        const articles = document.querySelectorAll('article');
                        ${isSandbox.toString()}
                        ${getName.toString()}
                        ${getDataSetProps.toString()}
                        ${productClickFromClient.toString()}
                        articles.forEach(art => {
                
                            art.addEventListener('click', (element) => {
                                productClickFromClient(element);
                            });

                            art.addEventListener('auxclick', (element) => {
                                productClickFromClient(element);
                               
                            });

                        })
              
                    })
                `
            }}
        />
    );
};

const getDataSetProps = element => {
    if (element) {
        const { dataset: articleDataSet = {} } = element;
        const { dataset: chainDataSet = {} } = (element.closest &&
            element.closest('.box-articles')) || {
            dataset: { blockName: '', diagramacionId: '', chainPosition: '' }
        };

        const { dataset: sectionDataSet = {} } = (element.closest &&
            element.closest('[data-section]')) || {
            dataset: { section: '' }
        };

        const { chainPosition, diagramacionId, blockName } = chainDataSet;
        const { section } = sectionDataSet;
        const { pos, id, source } = articleDataSet;

        const product = {
            position: `${chainPosition || ''}${pos}`,
            id,
            variant: source,
            brand: `${section}_${diagramacionId}`,
            list: blockName,
            name: getName(element)
        };
        const item = {
            item_list_id: `${chainPosition || ''}${pos}`,
            item_id: id,
            item_variant: source,
            item_brand: `${section}_${diagramacionId}`,
            item_list_name: blockName,
            item_name: getName(element),
            item_category: 'N/A',
            price: 1,
            index: 1,
            quantity: 1
        };
        return {
            product,
            item
        };
    }
    return {};
};

const getName = element => {
    const subtitle = element.querySelectorAll('h2, h1');
    if (subtitle && subtitle.length > 0) {
        return (subtitle[0].innerText && subtitle[0].innerText.trim()) || '';
    }
    return '';
};

export const productClickFromClient = (element = {}) => {
    const { product, item } = getDataSetProps(element.currentTarget);
    if (product.id) {
        window.dataLayer.push({
            event: `productClickScore`,
            product,
            item
        });
    }
    return true;
};

export const createIntersectionObserver = () => {
    try {
        const callback = (entries, observer) => {
            const articlesToAdd = [];
            const itemsToAdd = [];
            const articlesSeen =
                (sessionStorage &&
                    JSON.parse(sessionStorage.getItem('seenArticlesScore'))) ||
                [];

            entries.forEach(entry => {
                if (shouldAddArticle(entry, articlesSeen)) {
                    const { product, item } = getDataSetProps(entry.target);
                    articlesToAdd.push(product);
                    itemsToAdd.push(item);
                    observer.unobserve(entry.target);
                }
            });

            addEventImpressionToDataLayer(
                articlesToAdd,
                itemsToAdd,
                articlesSeen
            );
        };

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });

        document.querySelectorAll('article').forEach(element => {
            if (element) {
                observer.observe(element);
            }
        });

        return observer;
    } catch (error) {
        console.error('Error en viewability.js => createIntersectionObserver', {
            error,
            outputType: 'default',
            websiteUrl: 'lanacion.com.ar'
        });
        return {};
    }
};

const shouldAddArticle = (entry, articlesSeen) => {
    const idArticle = get(entry, 'target.dataset.id');
    return (
        entry.isIntersecting &&
        idArticle &&
        Array.isArray(articlesSeen) &&
        !articlesSeen.find(art => art.id === idArticle)
    );
};

const isSandbox = () => {
    if (window && window.location.host === 'lanacion.com.ar') return '';
    return '_DESA';
};

export const updateIndexOfItems = (items = []) => {
    const newItems = [];
    items.forEach((item, i) => {
        newItems.push({
            ...item,
            index: i + 1
        });
    });
    return newItems;
};

const addEventImpressionToDataLayer = (
    articlesToAdd = [],
    itemsToAdd = [],
    articlesSeen = []
) => {
    if (articlesToAdd.length > 0) {
        const itemsUpdated = updateIndexOfItems(itemsToAdd);
        window.dataLayer.push({
            event: `impressionsScore`,
            products: articlesToAdd,
            items: itemsUpdated
        });

        articlesSeen.push(...articlesToAdd);

        sessionStorage.setItem(
            'seenArticlesScore',
            JSON.stringify(
                articlesSeen.map(art => {
                    return { id: art.id, name: art.name };
                })
            )
        );
    }
};

export const createViewabilityObservers = () => {
    const interSectionObserver = createIntersectionObserver();

    const mutationCallback = (mutationsList, observer) => {
        mutationsList.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (get(node, 'dataset.module')) {
                    const arts = document.querySelectorAll(
                        `div[data-module=${node.dataset.module}] article`
                    );
                    arts.forEach(element => {
                        if (element && element.dataset.id) {
                            interSectionObserver.observe(element);
                        }
                    });
                }

                if (node.nodeName === 'ARTICLE' && node.dataset.id) {
                    interSectionObserver.observe(node);
                }
            });
        });
    };

    const mutationObserver = new MutationObserver(mutationCallback);
    mutationObserver.observe(
        document.querySelector('section[data-section=multimedia'),
        {
            attributes: false,
            childList: true,
            subtree: true
        }
    );

    // mutationObserver.disconnect();
};
